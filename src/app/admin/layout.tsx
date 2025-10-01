"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconHome2, IconUser, IconSettings } from "@tabler/icons-react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const links = [
    { label: "Contact", href: "/admin/admin-contact", icon: <IconHome2 size={20} /> },
    { label: "Enquiry", href: "/admin/admin-enquiry", icon: <IconUser size={20} /> },
    { label: "Job Applications", href: "/admin/job-applications", icon: <IconSettings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <SidebarLink
                key={index}
                link={link}
              />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
