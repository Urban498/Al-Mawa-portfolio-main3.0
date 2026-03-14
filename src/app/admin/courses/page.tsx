"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin-sidebar";
import CourseForm from "@/components/admin/CourseForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CourseType = {
  _id: string;
  iconKey: string;
  slug: string;
  title: string;
  desc: string;
  details: {
    overview: string;
    whatYouWillLearn: string[];
    whoIsThisFor: string[];
  };
};

const CoursesAdminPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseType | null>(null);
  const [activeSection, setActiveSection] = useState("courses");
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      if (res.data?.data) {
        setCourses(res.data.data);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const postCourse = async (data: any) => {
    try {
      await axios.post("/api/courses", data);
      toast.success("Course added");
      fetchCourses();
    } catch (err: any) {
      console.error("Error adding course:", err);
      toast.error("Failed to add course", {
        description: err?.response?.data?.message || "Please try again"
      });
    }
  };

  const editCourse = async (id: string, data: any) => {
    try {
      await axios.put(`/api/courses/${id}`, data);
      toast.success("Course updated");
      fetchCourses();
    } catch (err: any) {
      console.error("Error updating course:", err);
      toast.error("Failed to update course", {
        description: err?.response?.data?.message || "Please try again"
      });
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course");
    }
  };

  const onSubmit = (data: any) => {
    if (editingCourse) {
      editCourse(editingCourse._id, data);
    } else {
      postCourse(data);
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course: CourseType) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/admin-logout");
      if (res.data.success === true) {
        toast.success("Logout Success", {
          description: "You have been logged out successfully"
        });
        router.push("/admin");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed", {
        description: "Please try again"
      });
      router.push("/admin");
    }
  };

  const handleSetActiveSection = (section: string) => {
    setActiveSection(section);
    if (section !== "courses") {
      router.push(`/admin?section=${section}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900 relative">
      <div className="shrink-0">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={handleSetActiveSection}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex-1 p-4 md:p-6 min-h-screen overflow-auto min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            Courses Management
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Manage Courses
            </h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              + Add New Course
            </button>
          </div>

          <div className="space-y-4">
            {courses.length !== 0 ? (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                        /it-courses/{course.slug}
                      </p>
                      <p className="text-sm mt-2 text-gray-700 dark:text-gray-200">
                        {course.desc}
                      </p>
                    </div>

                    <div className="shrink-0 flex gap-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No courses found
              </p>
            )}
          </div>

          {isModalOpen && (
            <CourseForm
              onSubmit={onSubmit}
              onCancel={closeModal}
              initialData={
                editingCourse
                  ? {
                      iconKey: editingCourse.iconKey,
                      slug: editingCourse.slug,
                      title: editingCourse.title,
                      desc: editingCourse.desc,
                      overview: editingCourse.details?.overview,
                      whatYouWillLearn: (editingCourse.details?.whatYouWillLearn || []).join("\n"),
                      whoIsThisFor: (editingCourse.details?.whoIsThisFor || []).join("\n")
                    }
                  : undefined
              }
              isEditing={!!editingCourse}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesAdminPage;
