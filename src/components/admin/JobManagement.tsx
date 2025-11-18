"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Eye, EyeOff, RefreshCw, Edit, Plus, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  jobkeySkills: string[];
  jobDepartment: string;
  jobType: string;
  jobSalary?: string;
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{id: string, title: string} | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);
  
  // Edit functionality states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [updating, setUpdating] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [editFormData, setEditFormData] = useState<Job>({
    _id: "",
    jobTitle: "",
    jobDescription: "",
    jobkeySkills: [],
    jobDepartment: "",
    jobType: "",
    jobSalary: ""
  });

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

  // Edit functionality handlers
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setEditFormData({
      _id: job._id,
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      jobkeySkills: [...job.jobkeySkills],
      jobDepartment: job.jobDepartment,
      jobType: job.jobType,
      jobSalary: job.jobSalary || ""
    });
    setEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !editFormData.jobkeySkills.includes(skillInput.trim())) {
      setEditFormData(prev => ({
        ...prev,
        jobkeySkills: [...prev.jobkeySkills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditFormData(prev => ({
      ...prev,
      jobkeySkills: prev.jobkeySkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingJob) return;

    // Validation
    if (!editFormData.jobTitle.trim()) {
      toast.error("Job title is required");
      return;
    }
    if (!editFormData.jobDescription.trim()) {
      toast.error("Job description is required");
      return;
    }
    if (editFormData.jobkeySkills.length === 0) {
      toast.error("At least one key skill is required");
      return;
    }
    if (!editFormData.jobDepartment) {
      toast.error("Department is required");
      return;
    }
    if (!editFormData.jobType) {
      toast.error("Job type is required");
      return;
    }

    setUpdating(true);

    try {
      console.log("📤 Updating job:", editFormData);
      
      const response = await axios.put(`/api/jobs/${editingJob._id}`, {
        jobTitle: editFormData.jobTitle,
        jobDescription: editFormData.jobDescription,
        jobkeySkills: editFormData.jobkeySkills,
        jobDepartment: editFormData.jobDepartment,
        jobType: editFormData.jobType,
        jobSalary: editFormData.jobSalary
      });
      
      console.log("✅ Job updated successfully:", response.data);
      
      toast.success("Job Updated Successfully!", {
        description: `${editFormData.jobTitle} has been updated.`,
      });

      // Update the job in local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === editingJob._id ? response.data.data : job
        )
      );

      // Close dialog and reset form
      setEditDialogOpen(false);
      setEditingJob(null);
      setSkillInput("");

    } catch (error: unknown) {
      console.error("❌ Job update error:", error);
      
      toast.error("Failed to update job", {
        description: error instanceof Error ? error.message : "Please check your information and try again.",
      });
    } finally {
      setUpdating(false);
    }
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
                          
                          <Button
                            onClick={() => handleEditJob(job)}
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-900 border-blue-200 hover:border-blue-300"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
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
                        {job.jobSalary && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            ₹ {job.jobSalary}
                          </Badge>
                        )}
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

      {/* Edit Job Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Edit Job: {editingJob?.jobTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update the job details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateJob} className="space-y-6 mt-6">
            {/* Job Title */}
            <div>
              <Label htmlFor="editJobTitle" className="text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </Label>
              <Input
                id="editJobTitle"
                name="jobTitle"
                value={editFormData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g., Senior Frontend Developer"
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Job Description */}
            <div>
              <Label htmlFor="editJobDescription" className="text-gray-700 dark:text-gray-300 mb-2">
                Job Description *
              </Label>
              <Textarea
                id="editJobDescription"
                name="jobDescription"
                value={editFormData.jobDescription}
                onChange={handleInputChange}
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                rows={6}
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>

            {/* Job Salary */}
            <div>
              <Label htmlFor="editJobSalary" className="text-gray-700 dark:text-gray-300 mb-2">
                Job Salary (Optional)
              </Label>
              <Input
                id="editJobSalary"
                name="jobSalary"
                value={editFormData.jobSalary}
                onChange={handleInputChange}
                placeholder="e.g., ₹5,00,000 - ₹8,00,000 per annum"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to display &quot;Competitive&quot; as default
              </p>
            </div>

            {/* Key Skills */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2">
                Key Skills Required *
              </Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a skill and press Enter or click Add"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {editFormData.jobkeySkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editFormData.jobkeySkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Department and Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 mb-2">
                  Department *
                </Label>
                <Select 
                  value={editFormData.jobDepartment} 
                  onValueChange={(value) => handleSelectChange("jobDepartment", value)}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 mb-2">
                  Job Type *
                </Label>
                <Select 
                  value={editFormData.jobType} 
                  onValueChange={(value) => handleSelectChange("jobType", value)}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Buttons */}
            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setEditingJob(null);
                  setSkillInput("");
                }}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updating}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating Job..." : "Update Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobManagement;
