"use client";

import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  iconKey: string;
  slug: string;
  title: string;
  desc: string;
  overview: string;
  whatYouWillLearn: string;
  whoIsThisFor: string;
};

type CourseFormProps = {
  onSubmit: (data: {
    iconKey: string;
    slug: string;
    title: string;
    desc: string;
    details: {
      overview: string;
      whatYouWillLearn: string[];
      whoIsThisFor: string[];
    };
  }) => void;
  onCancel: () => void;
  initialData?: Partial<FormValues>;
  isEditing?: boolean;
};

const iconOptions = [
  { value: "code", label: "Web Development" },
  { value: "phone", label: "Mobile App Development" },
  { value: "brain", label: "Artificial Intelligence" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "sun", label: "UI/UX Design" },
  { value: "briefcase", label: "Internship" }
];

function linesToArray(value: string): string[] {
  return String(value || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const CourseForm: React.FC<CourseFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialData
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          {isEditing ? "Edit Course" : "Add Course"}
        </h2>

        <form
          onSubmit={handleSubmit((values) => {
            onSubmit({
              iconKey: values.iconKey,
              slug: values.slug,
              title: values.title,
              desc: values.desc,
              details: {
                overview: values.overview,
                whatYouWillLearn: linesToArray(values.whatYouWillLearn),
                whoIsThisFor: linesToArray(values.whoIsThisFor)
              }
            });
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon
              </label>
              <select
                {...register("iconKey", { required: "Icon is required" })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select icon...</option>
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.iconKey && (
                <p className="text-red-500 text-sm mt-1">{errors.iconKey.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                placeholder="e.g. web-development"
                {...register("slug", { required: "Slug is required" })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Course title"
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Short Description
            </label>
            <textarea
              rows={3}
              placeholder="Short course description shown on the card"
              {...register("desc", { required: "Description is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Overview
            </label>
            <textarea
              rows={4}
              placeholder="Long overview shown on the details page"
              {...register("overview", { required: "Overview is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
            {errors.overview && (
              <p className="text-red-500 text-sm mt-1">{errors.overview.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                What you will learn (one per line)
              </label>
              <textarea
                rows={6}
                placeholder="Line 1\nLine 2\nLine 3"
                {...register("whatYouWillLearn", { required: "This field is required" })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              {errors.whatYouWillLearn && (
                <p className="text-red-500 text-sm mt-1">{errors.whatYouWillLearn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Who is this for? (one per line)
              </label>
              <textarea
                rows={6}
                placeholder="Line 1\nLine 2\nLine 3"
                {...register("whoIsThisFor", { required: "This field is required" })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              {errors.whoIsThisFor && (
                <p className="text-red-500 text-sm mt-1">{errors.whoIsThisFor.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {isEditing ? "Update" : "Add"} Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
