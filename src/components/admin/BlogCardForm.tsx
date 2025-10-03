"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";

type FormValues = {
  title: string;
  subtitle: string;
  description: string;
};

type BlogCardFormProps = {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  initialData?: Partial<FormValues>;
  isEditing?: boolean;
};

const BlogCardForm: React.FC<BlogCardFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const titleValue = watch("title");

  // AI API call to generate description
  const generateDescription = async (title: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate description');
      }
      
      const data = await response.json();
      return data.description;
    } catch (error) {
      console.error('Error generating description:', error);
      throw error;
    }
  };

  const handleGenerateDescription = async () => {
    if (!titleValue?.trim()) {
      alert("Please enter a title first to generate a description.");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedDescription = await generateDescription(titleValue);
      setValue("description", generatedDescription);
      
      // Optional: Show success message
      console.log("✅ Description generated successfully");
    } catch (error) {
      console.error("Failed to generate description:", error);
      
      // Provide a more helpful error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to generate description: ${errorMessage}\n\nPlease try again or enter the description manually.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          {isEditing ? "Edit Blog Card" : "Add Blog Card"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Subtitle Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              placeholder="Enter blog subtitle"
              {...register("subtitle", { required: "Subtitle is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.subtitle && (
              <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter blog description or generate with AI"
              rows={4}
              {...register("description", { required: "Description is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
            
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* AI Generate Button */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating || !titleValue?.trim()}
              className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-md transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:cursor-not-allowed"
              title={!titleValue?.trim() ? "Enter a title first" : "Generate description with AI"}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Description...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Description with AI</span>
                </>
              )}
            </button>
            
            {/* Loading indicator */}
            {isGenerating && (
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is generating your description...</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors disabled:cursor-not-allowed"
            >
              {isEditing ? "Update" : "Add"} Blog Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCardForm;
