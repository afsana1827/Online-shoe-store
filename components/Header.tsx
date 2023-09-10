"use client";
import Link from "next/link";
import React, { useEffect, useState, memo } from "react";

import { BiMenuAltRight } from "react-icons/bi";

import { VscChromeClose } from "react-icons/vsc";
import Menu from "./Menu";
import MenuMobile from "./MobilMenu";
import SignInButton from "./shared/common-button/signin-button";
import HeaderIcon from "./HeaderIcon";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`px-10 w-full h-[50px] md:h-[80px] bg-white border-b shadow-sm  border-theme-light-gray flex items-center justify-between z-50 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <div className=" w-full h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px]" alt="" />
        </Link>
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}
        <div className=" flex items-center gap-2 text-black">
          <HeaderIcon />

          {/* Icon End */}
          {/* Mobile icon start */}
          <SignInButton />
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
