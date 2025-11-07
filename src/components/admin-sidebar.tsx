"use client";

import React from "react";
import { Sidebar, SidebarBody, useSidebar } from "@/components/ui/sidebar";
import { IconHome2, IconUser, IconSettings, IconBriefcase, IconTrash, IconUsers } from "@tabler/icons-react";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactNode;
  link?: string;
}

// This component will be inside SidebarBody and can access useSidebar
const SidebarContent = ({ activeSection, setActiveSection, onLogout }: AdminSidebarProps) => {
  const { open } = useSidebar();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { label: "Contact", key: "contact", icon: <IconHome2 size={20} /> },
    { label: "Enquiry", key: "enquiry", icon: <IconUser size={20} /> },
    { label: "Visitors", key: "visitors", icon: <IconUsers size={20} /> },
    { label: "Job Applications", key: "jobs", icon: <IconSettings size={20} /> },
    { label: "Post Jobs", key: "post-jobs", icon: <IconBriefcase size={20} /> },
    { label: "Manage Jobs", key: "manage-jobs", icon: <IconTrash size={20} /> },
    { label: "Cards", key: "cards", link: "/admin/cards", icon: <IconSettings size={20} /> },
  ];


  const logout = async () => {
    try {
      console.log("🔄 Attempting logout...");
      const res = await axios.post("/api/admin-logout");
      console.log("📤 Logout response:", res.data);
      
      if (res.data.success === true) {
        console.log("✅ Logout successful, showing toast");
        toast.success("Logout Success", {
          description: "You have been logged out successfully"
        });
        onLogout();
      }
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Logout failed", {
        description: "Please try again"
      });
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Navigation Links */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSection(item.key);
              if (item.link && window.location.pathname !== item.link) {
                router.push(item.link);
              }
            }}
            className={`relative flex items-center gap-2 px-2 py-2 rounded-md transition-colors text-left group ${
              activeSection === item.key
                ? "bg-neutral-300 dark:bg-neutral-700"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-600"
            }`}
            title={!open ? item.label : undefined}
          >
            <div className="flex items-center justify-center min-w-[20px]">
              {item.icon}
            </div>
            
            <motion.span
              animate={{
                opacity: open ? 1 : 0,
                width: open ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
              className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>

            {/* Tooltip for collapsed state */}
            {!open && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="relative mt-auto flex items-center gap-2 px-2 py-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 transition-colors group"
        title={!open ? "Logout" : undefined}
      >
        <div className="flex items-center justify-center min-w-[20px]">
          <CiLogout size={20} />
        </div>
        
        <motion.span
          animate={{
            opacity: open ? 1 : 0,
            width: open ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap overflow-hidden"
        >
          Logout
        </motion.span>

        {/* Tooltip for collapsed state */}
        {!open && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
            Logout
          </div>
        )}
      </button>
    </div>
  );
};

const AdminSidebar = ({ activeSection, setActiveSection, onLogout }: AdminSidebarProps) => {
  return (
    <div className="h-screen">
      <Sidebar>
        <SidebarBody className="h-full">
          <SidebarContent 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onLogout={onLogout}
          />
        </SidebarBody>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
