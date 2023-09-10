"use client";
import { getCategory } from "@/action/categories/getCategoryId";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const menuData = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });
  if (isLoading) {
    return <p> category data is loading...</p>;
  }
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {menuData.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {data?.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          href={`/category/${item?.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {item.name}
                            <span className="opacity-50 text-sm">
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
              <li className="py-4 px-5 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
