"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AdminSidebar from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CardType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
};

type FormValues = {
  title: string;
  subtitle: string;
  description: string;
};

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [activeSection, setActiveSection] = useState("cards");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // 🔹 Fetch all cards
  const fetchCards = async () => {
    try {
      const res = await axios.get("/api/card/[id]");
      console.log(res.data?.data);
      
      if (res.data?.data) {
        setCards(res.data.data);
      } else {
        setCards(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // 🔹 Add new card
  const postCard = async (data: FormValues) => {
    try {
      await axios.post("/api/card/[id]", data);
      fetchCards();
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };

  // 🔹 Edit existing card
  const editCard = async (id: string, data: FormValues) => {
    try {
      await axios.put(`/api/card/${id}`, data);
      fetchCards();
    } catch (err) {
      console.error("Error updating card:", err);
    }
  };

  // 🔹 Delete card
  const deleteCard = async (id: string) => {
    try {
      await axios.delete(`/api/card/${id}`);
      fetchCards();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  };

  // 🔹 Handle form submit
  const onSubmit = (data: FormValues) => {
    if (editingCard) {
      editCard(editingCard._id, data);
    } else {
      postCard(data);
    }
    closeModal();
  };

  // 🔹 Open modal for Add
  const openAddModal = () => {
    reset();
    setEditingCard(null);
    setIsModalOpen(true);
  };

  // 🔹 Open modal for Edit
  const openEditModal = (card: CardType) => {
    setValue("title", card.title);
    setValue("subtitle", card.subtitle);
    setValue("description", card.description);
    setEditingCard(card);
    setIsModalOpen(true);
  };

  // 🔹 Close modal
  const closeModal = () => {
    reset();
    setEditingCard(null);
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
    // Navigate to main admin page for other sections with section parameter
    if (section !== "cards") {
      router.push(`/admin?section=${section}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900 relative">
      {/* Sidebar */}
      <div className="shrink-0">
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={handleSetActiveSection}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 min-h-screen overflow-auto min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            Cards Management
          </h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manage Cards</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              + Add New Card
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {cards.length !== 0 ? cards.map((card) => (
              <div
                key={card._id}
                className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
                <h4 className="text-sm text-gray-600 dark:text-gray-300">{card.subtitle}</h4>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-200">{card.description}</p>

                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => openEditModal(card)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(card._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No cards found</p>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {editingCard ? "Edit Card" : "Add Card"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                  <input
                    type="text"
                    placeholder="Subtitle"
                    {...register("subtitle", { required: "Subtitle is required" })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}

                  <textarea
                    placeholder="Description"
                    {...register("description", { required: "Description is required" })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      {editingCard ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
