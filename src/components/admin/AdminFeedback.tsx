"use client";

import React, { useState, useEffect } from "react";
import { Trash2, RefreshCw, Eye, EyeOff, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Review {
  name: string;
  designation: string;
  feedback: string;
  rating: number;
  image?: string;
  createdAt?: string;
}

interface ReviewToDelete {
  index: number;
  name: string;
}

export default function AdminFeedback() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewToDelete | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect fill='%23E5E7EB' width='128' height='128'/%3E%3Ccircle cx='64' cy='40' r='16' fill='%239CA3AF'/%3E%3Cpath d='M32 100 Q32 75 64 75 Q96 75 96 100 L96 128 L32 128 Z' fill='%239CA3AF'/%3E%3C/svg%3E";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReviewExpansion = (index: number) => {
    setExpandedReviews((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleDelete = async (index: number) => {
    try {
      setDeleting(index);
      const response = await fetch(`/api/reviews?index=${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setDeleteDialogOpen(false);
        setReviewToDelete(null);
        toast.success("Review Deleted Successfully!", {
          description: "The feedback has been removed.",
        });
        setExpandedReviews((prev) => prev.filter((i) => i !== index));
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review");
    } finally {
      setDeleting(null);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      review.name.toLowerCase().includes(searchLower) ||
      review.designation.toLowerCase().includes(searchLower) ||
      review.feedback.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading feedback...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Client Feedback
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            View and manage all client feedback submissions. You can delete feedback as needed.
          </CardDescription>
        </div>
        <Button
          onClick={fetchReviews}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, designation, or feedback text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Found <span className="font-semibold">{filteredReviews.length}</span> of <span className="font-semibold">{reviews.length}</span> feedback(s)
            </p>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Trash2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Feedback Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              There are currently no client feedback submissions to manage.
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              No feedback matches your search query. Try different keywords.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="mb-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={review.image || defaultImage}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-[#0ea5e9]"
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {review.designation}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {expandedReviews.includes(index) && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                            &ldquo;{review.feedback}&rdquo;
                          </p>
                          {review.createdAt && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()} at{" "}
                              {new Date(review.createdAt).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => toggleReviewExpansion(index)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        {expandedReviews.includes(index) ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>

                      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deleting === index}
                            className="flex items-center gap-2"
                            onClick={() => {
                              setReviewToDelete({ index, name: review.name });
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                            {deleting === index ? "Deleting..." : "Delete"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Feedback</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete the feedback from &ldquo;{reviewToDelete?.name}&rdquo;? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setDeleteDialogOpen(false);
                                setReviewToDelete(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                if (reviewToDelete?.index !== undefined) {
                                  handleDelete(reviewToDelete.index);
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
