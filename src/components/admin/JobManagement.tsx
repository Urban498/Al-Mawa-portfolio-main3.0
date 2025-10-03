"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Eye, EyeOff, RefreshCw } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  jobkeySkills: string[];
  jobDepartment: string;
  jobType: string;
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{id: string, title: string} | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/jobs");
      if (response.data.success && response.data.data) {
        setJobs(response.data.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    try {
      setDeleting(jobId);
      console.log(`🗑️ Deleting job: ${jobTitle} (ID: ${jobId})`);
      
      const response = await axios.delete(`/api/jobs/${jobId}`);
      
      if (response.data.success) {
        console.log("✅ Job deleted successfully:", response.data);
        
        toast.success("Job Deleted Successfully!", {
          description: `${jobTitle} has been removed from the careers page.`,
        });
        
        // Remove the job from the local state
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        
        // Remove from expanded jobs if it was expanded
        setExpandedJobs(prev => prev.filter(id => id !== jobId));
      } else {
        throw new Error(response.data.message || "Failed to delete job");
      }
    } catch (error: unknown) {
      console.error("❌ Job deletion error:", error);
      
      toast.error("Failed to delete job", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setDeleting(null);
    }
  };

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return (
      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading jobs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Manage Jobs
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            View and manage all job postings. You can delete jobs that are no longer available.
          </CardDescription>
        </div>
        <Button
          onClick={fetchJobs}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Trash2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              There are currently no job postings to manage. Create some jobs first using the &ldquo;Post Jobs&rdquo; section.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job._id} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {job.jobTitle}
                        </h3>
                        <div className="flex gap-2 ml-4">
                          <Button
                            onClick={() => toggleJobExpansion(job._id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          >
                            {expandedJobs.includes(job._id) ? (
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
                                disabled={deleting === job._id}
                                className="flex items-center gap-2"
                                onClick={() => {
                                  setJobToDelete({id: job._id, title: job.jobTitle});
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                                {deleting === job._id ? "Deleting..." : "Delete"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Job Posting</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete &ldquo;{jobToDelete?.title}&rdquo;? This action cannot be undone and the job will be removed from the careers page immediately.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setDeleteDialogOpen(false);
                                    setJobToDelete(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    if (jobToDelete) {
                                      handleDeleteJob(jobToDelete.id, jobToDelete.title);
                                      setDeleteDialogOpen(false);
                                      setJobToDelete(null);
                                    }
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete Job
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {job.jobDepartment}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {job.jobType}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {expandedJobs.includes(job._id) 
                          ? job.jobDescription 
                          : truncateText(job.jobDescription)
                        }
                      </p>
                      
                      {expandedJobs.includes(job._id) && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Key Skills Required:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.jobkeySkills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
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
};

export default JobManagement;
