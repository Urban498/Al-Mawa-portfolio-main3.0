"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  jobkeySkills: string[];
  jobDepartment: string;
  jobType: string;
}

const JobPostForm = () => {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    jobDescription: "",
    jobkeySkills: [],
    jobDepartment: "",
    jobType: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.jobkeySkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        jobkeySkills: [...prev.jobkeySkills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobTitle.trim()) {
      toast.error("Job title is required");
      return;
    }
    if (!formData.jobDescription.trim()) {
      toast.error("Job description is required");
      return;
    }
    if (formData.jobkeySkills.length === 0) {
      toast.error("At least one key skill is required");
      return;
    }
    if (!formData.jobDepartment) {
      toast.error("Department is required");
      return;
    }
    if (!formData.jobType) {
      toast.error("Job type is required");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Submitting job:", formData);
      
      const response = await axios.post("/api/jobs", formData);
      
      console.log("✅ Job posted successfully:", response.data);
      
      toast.success("Job Posted Successfully!", {
        description: `${formData.jobTitle} has been posted and is now live on the careers page.`,
      });

      // Reset form
      setFormData({
        jobTitle: "",
        jobDescription: "",
        jobkeySkills: [],
        jobDepartment: "",
        jobType: ""
      });
      setSkillInput("");

    } catch (error: unknown) {
      console.error("❌ Job posting error:", error);
      
      toast.error("Failed to post job", {
        description: error instanceof Error ? error.message : "Please check your information and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Post New Job
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Fill out the form below to create a new job posting that will appear on the careers page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <Label htmlFor="jobTitle" className="text-gray-700 dark:text-gray-300 mb-2">
              Job Title *
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="e.g., Senior Frontend Developer"
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Job Description */}
          <div>
            <Label htmlFor="jobDescription" className="text-gray-700 dark:text-gray-300 mb-2">
              Job Description *
            </Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              rows={6}
              required
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
            />
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
              
              {formData.jobkeySkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.jobkeySkills.map((skill, index) => (
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
                value={formData.jobDepartment} 
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
                value={formData.jobType} 
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

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  jobTitle: "",
                  jobDescription: "",
                  jobkeySkills: [],
                  jobDepartment: "",
                  jobType: ""
                });
                setSkillInput("");
              }}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting Job..." : "Post Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
