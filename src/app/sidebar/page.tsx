"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MenuItem {
  name: string;
  href?: string;
  isButton?: boolean;
}

const mainMenu: MenuItem[] = [
  { name: "New & Featured", isButton: true },
  { name: "Men", isButton: true },
  { name: "Women", isButton: true },
  { name: "Kids", isButton: true },
  { name: "Sale", isButton: true },
  { name: "SNKRS", href: "https://www.nike.com/in/launch" },
];

const brandMenu: MenuItem[] = [
  { name: "Jordan", href: "https://www.nike.com/in/jordan" },
];

export default function SidebarPage() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Open Sidebar
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-white shadow-lg w-80 max-w-full overflow-y-auto"
      data-testid="mobile-menu-container"
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          aria-label="Close Menu"
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col space-y-2 px-4">
        {mainMenu.map((item, idx) =>
          item.isButton ? (
            <button
              key={idx}
              className="flex justify-between items-center py-3 border-b text-lg font-medium w-full text-left"
            >
              {item.name}
              <span>→</span>
            </button>
          ) : (
            <Link
              key={idx}
              href={item.href ?? "#"}
              className="py-3 border-b text-lg font-medium block"
            >
              {item.name}
            </Link>
          )
        )}
      </div>

      {/* Brand Menu */}
      <nav aria-label="Brand navigation" className="px-4 mt-4">
        <ul className="space-y-3">
          {brandMenu.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href ?? "#"}
                className="flex items-center space-x-2 text-gray-700"
              >
                <span className="w-3 h-3 rounded-full bg-black"></span>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign In Section */}
      <div className="px-4 py-6 border-t mt-6">
        <h4 className="text-sm text-gray-600">
          Become a Nike Member for the best products, inspiration and stories in
          sport.{" "}
          <Link
            href="https://www.nike.com/in/membership"
            className="text-blue-600 underline"
          >
            Learn more
          </Link>
        </h4>
        <div className="flex space-x-3 mt-4">
          <Link
            href="https://www.nike.com/in/membership"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Join Us
          </Link>
          <button className="px-4 py-2 bg-black text-white rounded">
            Sign In
          </button>
        </div>
      </div>

      {/* User Links */}
      <div className="px-4 py-6 border-t space-y-4">
        <Link href="https://www.nike.com/in/help" className="flex items-center space-x-2">
          <span>❓</span>
          <p>Help</p>
        </Link>

        <Link href="https://www.nike.com/in/cart" className="flex items-center space-x-2">
          <span>🛍️</span>
          <p>Bag</p>
        </Link>

        <Link href="https://www.nike.com/in/orders" className="flex items-center space-x-2">
          <span>📦</span>
          <p>Orders</p>
        </Link>

        <Link href="https://www.nike.com/in/retail" className="flex items-center space-x-2">
          <span>🏬</span>
          <p>Find a Store</p>
        </Link>
      </div>
    </div>
  );
}
