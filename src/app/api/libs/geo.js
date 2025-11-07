import axios from 'axios';

// Cache successful responses
const geoCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper to validate location data
function isValidLocationData(data) {
  return (
    data &&
    typeof data.city === 'string' &&
    data.city.length > 0 &&
    data.city !== 'Unknown' &&
    typeof data.country === 'string' &&
    data.country.length > 0 &&
    data.country !== 'Unknown'
  );
}

export async function getLocationData(ip) {
  // Check cache first
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📦 Using cached location data for IP:', ip);
    return cached.data;
  }

  // List of geolocation services to try in order
  const services = [
    {
      name: 'ip-api',
      url: `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,query`,
      transform: (data) => ({
        city: data.city,
        region: data.regionName || data.region,
        country: data.country,
        countryCode: data.countryCode,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone
      })
    },
    {
      name: 'ipapi.co',
      url: `https://ipapi.co/${ip}/json/`,
      transform: (data) => ({
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      })
    },
    {
      name: 'ipwho.is',
      url: `https://ipwho.is/${ip}`,
      transform: (data) => ({
        city: data.city,
        region: data.region,
        country: data.country,
        countryCode: data.country_code,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      })
    }
  ];

  // Try each service in sequence until we get valid data
  for (const service of services) {
    try {
      console.log(`🌍 Trying ${service.name} for IP:`, ip);
      const { data } = await axios.get(service.url, {
        timeout: 5000,
      });

      if (data.error) {
        console.log(`⚠️ ${service.name} returned error:`, data.error);
        continue;
      }

      const locationData = service.transform(data);

      // Validate the transformed data
      if (isValidLocationData(locationData)) {
        console.log(`✅ Valid location data from ${service.name}:`, locationData);
        
        // Cache the successful result
        geoCache.set(ip, {
          timestamp: Date.now(),
          data: locationData
        });
        
        return locationData;
      } else {
        console.log(`⚠️ Invalid location data from ${service.name}:`, locationData);
      }
    } catch (error) {
      console.error(`❌ ${service.name} error:`, error.message);
    }
  }

  // If all services fail, return null
  console.error('❌ All geolocation services failed');
  return null;
}