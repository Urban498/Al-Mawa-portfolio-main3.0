import { connectDB } from "../libs/db";
import Visitor from "../models/Visitor";

export async function GET(request) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const country = searchParams.get("country");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    const stats = searchParams.get("stats") === "true";

    // Build filter query
    const filter = {};
    
    if (country) {
      // Search in both country and city fields
      filter.$or = [
        { country: { $regex: country, $options: "i" } },
        { city: { $regex: country, $options: "i" } }
      ];
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get visitors with pagination
    const visitors = await Visitor.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .select("-__v"); // Exclude version key

    // Get total count for pagination
    const totalVisitors = await Visitor.countDocuments(filter);
    const totalPages = Math.ceil(totalVisitors / limit);

    // Prepare response
    const response = {
      success: true,
      visitors,
      pagination: {
        currentPage: page,
        totalPages,
        totalVisitors,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    // Add statistics if requested
    if (stats) {
      const statistics = await getVisitorStatistics(filter);
      response.statistics = statistics;
    }

    return Response.json(response);
  } catch (error) {
    console.error("Get Visitors Error:", error);
    
    return Response.json({
      success: false,
      error: "Failed to retrieve visitors",
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    }, { status: 500 });
  }
}

// Helper function to get visitor statistics
async function getVisitorStatistics(filter = {}) {
  try {
    const [
      totalVisits,
      uniqueVisitors,
      topCountries,
      recentVisitors,
      visitsByDate,
    ] = await Promise.all([
      // Total visits (sum of all visit counts)
      Visitor.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: "$visitCount" } } },
      ]),

      // Unique visitors
      Visitor.countDocuments(filter),

      // Top 10 countries
      Visitor.aggregate([
        { $match: filter },
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { country: "$_id", count: 1, _id: 0 } },
      ]),

      // Recent visitors (last 24 hours)
      Visitor.countDocuments({
        ...filter,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),

      // Visits by date (last 7 days)
      Visitor.aggregate([
        {
          $match: {
            ...filter,
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { date: "$_id", count: 1, _id: 0 } },
      ]),
    ]);

    return {
      totalVisits: totalVisits[0]?.total || 0,
      uniqueVisitors,
      recentVisitors24h: recentVisitors,
      topCountries,
      visitsByDate,
    };
  } catch (error) {
    console.error("Statistics Error:", error);
    return null;
  }
}
