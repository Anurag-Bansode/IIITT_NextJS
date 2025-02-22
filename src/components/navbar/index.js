"use client";
// components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch("json/navbar_data.json"); // Fetch from public folder
        const data = await res.json();
        debugger;
        setNavItems(data.data); 
      } catch (error) {
        console.error("Error loading navbar items:", error);
      }
    };

    fetchNavItems();
  }, []);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        {navItems.map((item, index) => (
          <li key={index} className="relative group">
            <span className="cursor-pointer hover:underline">{item.text}</span>
            {item.submenu && (
              <ul className="absolute left-0 hidden group-hover:block bg-gray-700 p-2 rounded-md shadow-md">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="p-2 hover:bg-gray-600 rounded-md">
                    <Link href={subItem.link}>{subItem.text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
