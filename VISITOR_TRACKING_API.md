# Visitor Tracking API Documentation

## Overview
Enhanced visitor tracking system with IP geolocation, session management, and comprehensive analytics.

---

## 📋 API Endpoints

### 1. **Track Visitor Location**
**Endpoint:** `GET /api/get-location`

**Description:** Tracks visitor location using IP geolocation and stores visitor data.

**Features:**
- ✅ Real IP detection (supports x-forwarded-for, x-real-ip, cf-connecting-ip)
- ✅ IP validation (IPv4 and IPv6)
- ✅ Duplicate prevention (24-hour window)
- ✅ Visit count tracking for returning visitors
- ✅ User agent and referrer capture
- ✅ Session ID generation
- ✅ Fallback handling when geolocation API fails
- ✅ Timeout protection (5 seconds)

**Response Examples:**

**New Visitor:**
```json
{
  "success": true,
  "message": "Visitor tracked successfully",
  "visitor": {
    "ip": "203.0.113.45",
    "city": "Mumbai",
    "region": "Maharashtra",
    "country": "India",
    "timezone": "Asia/Kolkata",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Returning Visitor (within 24h):**
```json
{
  "success": true,
  "message": "Welcome back!",
  "visitor": {
    "ip": "203.0.113.45",
    "city": "Mumbai",
    "country": "India",
    "visitCount": 3
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Unable to determine valid IP address",
  "message": "Your IP address could not be detected. This might be due to network configuration."
}
```

---

### 2. **Get Visitors List**
**Endpoint:** `GET /api/get-visitors`

**Description:** Retrieves visitor records with pagination, filtering, and statistics.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 50 | Number of records per page |
| `country` | string | - | Filter by country name (case-insensitive) |
| `startDate` | ISO date | - | Filter visitors from this date |
| `endDate` | ISO date | - | Filter visitors until this date |
| `sortBy` | string | createdAt | Field to sort by (createdAt, country, visitCount, etc.) |
| `sortOrder` | string | desc | Sort order: "asc" or "desc" |
| `stats` | boolean | false | Include statistics in response |

**Example Requests:**

```bash
# Get first page with default settings
GET /api/get-visitors

# Get page 2 with 20 records per page
GET /api/get-visitors?page=2&limit=20

# Filter by country
GET /api/get-visitors?country=India

# Get visitors from last week with statistics
GET /api/get-visitors?startDate=2024-11-01&stats=true

# Sort by visit count (most visits first)
GET /api/get-visitors?sortBy=visitCount&sortOrder=desc
```

**Response Example:**

```json
{
  "success": true,
  "visitors": [
    {
      "_id": "673c1234567890abcdef1234",
      "ip": "203.0.113.45",
      "city": "Mumbai",
      "region": "Maharashtra",
      "country": "India",
      "countryCode": "IN",
      "latitude": 19.0760,
      "longitude": 72.8777,
      "timezone": "Asia/Kolkata",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "referrer": "https://google.com",
      "sessionId": "550e8400-e29b-41d4-a716-446655440000",
      "visitCount": 3,
      "lastVisit": "2024-11-07T05:30:00.000Z",
      "createdAt": "2024-11-06T10:15:00.000Z",
      "updatedAt": "2024-11-07T05:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalVisitors": 247,
    "limit": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "statistics": {
    "totalVisits": 523,
    "uniqueVisitors": 247,
    "recentVisitors24h": 45,
    "topCountries": [
      { "country": "India", "count": 89 },
      { "country": "United States", "count": 67 },
      { "country": "United Kingdom", "count": 34 }
    ],
    "visitsByDate": [
      { "date": "2024-11-01", "count": 23 },
      { "date": "2024-11-02", "count": 31 },
      { "date": "2024-11-03", "count": 28 }
    ]
  }
}
```

---

## 🗄️ Database Schema

### Visitor Model

```javascript
{
  ip: String (required, indexed),
  city: String (default: "Unknown"),
  region: String (default: "Unknown"),
  country: String (default: "Unknown", indexed),
  countryCode: String (default: "Unknown"),
  latitude: Number (nullable),
  longitude: Number (nullable),
  timezone: String (default: "Unknown"),
  userAgent: String (default: "Unknown"),
  referrer: String (default: "Direct"),
  sessionId: String (indexed),
  visitCount: Number (default: 1),
  lastVisit: Date (default: Date.now),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Indexes:**
- `ip` (single field index)
- `country` (single field index)
- `sessionId` (single field index)
- `{ ip: 1, createdAt: -1 }` (compound index)
- `{ country: 1, createdAt: -1 }` (compound index)

**Methods:**
- `incrementVisit()` - Increments visit count and updates lastVisit timestamp

---

## 🔧 Implementation Guide

### 1. Install Required Package

```bash
npm install uuid
```

### 2. Environment Variables

Add to your `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=development
```

### 3. Frontend Integration

**Track visitor on page load:**

```javascript
// In your layout.tsx or main page component
useEffect(() => {
  const trackVisitor = async () => {
    try {
      const response = await fetch('/api/get-location');
      const data = await response.json();
      
      if (data.success) {
        console.log('Visitor tracked:', data.visitor);
        // Store sessionId in localStorage if needed
        if (data.visitor.sessionId) {
          localStorage.setItem('sessionId', data.visitor.sessionId);
        }
      }
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  trackVisitor();
}, []);
```

**Fetch visitor statistics:**

```javascript
const fetchVisitorStats = async () => {
  try {
    const response = await fetch('/api/get-visitors?stats=true&limit=10');
    const data = await response.json();
    
    if (data.success) {
      console.log('Total visitors:', data.pagination.totalVisitors);
      console.log('Statistics:', data.statistics);
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};
```

---

## 📊 Statistics Breakdown

When `stats=true` is included, the API returns:

1. **totalVisits** - Sum of all visit counts (includes repeat visits)
2. **uniqueVisitors** - Count of unique IP addresses
3. **recentVisitors24h** - Visitors in the last 24 hours
4. **topCountries** - Top 10 countries by visitor count
5. **visitsByDate** - Daily visitor count for the last 7 days

---

## 🔒 Security & Privacy

### GDPR Compliance
- IP addresses are considered personal data under GDPR
- Consider implementing:
  - Cookie consent banner
  - Privacy policy disclosure
  - Data retention policy (auto-delete old records)
  - User opt-out mechanism

### IP Anonymization (Optional)
To anonymize IPs, add this helper:

```javascript
function anonymizeIP(ip) {
  const parts = ip.split('.');
  if (parts.length === 4) {
    // IPv4: Replace last octet with 0
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  // For IPv6, mask last 80 bits
  return ip.split(':').slice(0, 3).join(':') + '::';
}
```

---

## 🚀 Performance Optimization

### Database Indexes
Already implemented compound indexes for common queries:
- `{ ip: 1, createdAt: -1 }` - For finding recent visitors by IP
- `{ country: 1, createdAt: -1 }` - For country-based analytics

### Caching Strategy
Consider implementing Redis caching for:
- Frequently accessed statistics
- Top countries list
- Recent visitor counts

### Rate Limiting
Add rate limiting to prevent abuse:

```javascript
// Example using simple in-memory store
const visitTracker = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const visits = visitTracker.get(ip) || [];
  const recentVisits = visits.filter(time => now - time < 60000); // 1 minute
  
  if (recentVisits.length >= 10) {
    return false; // Too many requests
  }
  
  recentVisits.push(now);
  visitTracker.set(ip, recentVisits);
  return true;
}
```

---

## 🧪 Testing

### Test IP Detection
```bash
curl -H "X-Forwarded-For: 8.8.8.8" http://localhost:3000/api/get-location
```

### Test Pagination
```bash
curl "http://localhost:3000/api/get-visitors?page=1&limit=10"
```

### Test Filtering
```bash
curl "http://localhost:3000/api/get-visitors?country=India&stats=true"
```

---

## 📈 Analytics Dashboard Ideas

Use the API to build:
1. **Real-time visitor map** - Plot visitors on world map using lat/long
2. **Country distribution chart** - Pie chart of top countries
3. **Visit trends graph** - Line chart showing visits over time
4. **Recent visitors table** - Live feed of latest visitors
5. **Device analytics** - Parse userAgent for device/browser stats

---

## 🐛 Troubleshooting

### Issue: "Unable to determine valid IP address"
- **Cause:** Running on localhost or behind proxy without proper headers
- **Solution:** Configure your proxy to forward IP headers or test on production

### Issue: Geolocation API timeout
- **Cause:** ipapi.co is slow or down
- **Solution:** API automatically falls back to saving visitor with "Unknown" location

### Issue: Duplicate visitors not detected
- **Cause:** 24-hour window has passed
- **Solution:** Adjust the time window in the query: `Date.now() - 24 * 60 * 60 * 1000`

### Issue: Statistics not showing
- **Cause:** `stats=true` parameter not included
- **Solution:** Add `?stats=true` to the URL

---

## 📝 Changelog

### Version 2.0 (Current)
- ✅ Enhanced schema with 13 fields
- ✅ IP validation (IPv4/IPv6)
- ✅ Duplicate prevention (24h window)
- ✅ Visit count tracking
- ✅ Session management
- ✅ User agent & referrer tracking
- ✅ Pagination support
- ✅ Advanced filtering
- ✅ Statistics aggregation
- ✅ Error handling & fallbacks
- ✅ Database indexing

### Version 1.0 (Previous)
- Basic IP tracking
- Simple location storage
- No duplicate prevention

---

## 🔗 External Dependencies

- **ipapi.co** - Free IP geolocation API (1,000 requests/day)
- **uuid** - Session ID generation
- **axios** - HTTP client for API calls
- **mongoose** - MongoDB ODM

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs in console
3. Verify MongoDB connection
4. Check environment variables

---

**Last Updated:** November 7, 2024
**Version:** 2.0.0
