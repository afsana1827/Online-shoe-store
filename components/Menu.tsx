"use client";

import { getCategory } from "@/action/categories/getCategoryId";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const menuData = [
  { id: 1, name: "Home", url: "/" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 2, name: "About", url: "/about" },
  { id: 4, name: "Contact", url: "/contact" },
];

const Menu = ({ showCatMenu, setShowCatMenu }: any) => {
  const { data } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });

  return (
    <ul className="items-center hidden gap-8 font-medium text-black md:flex">
      {menuData.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                    {data?.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          href={`/category/${item?.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {item.name}
                            <span className="text-sm opacity-50">
                              {`(${item?.products?.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
