import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { SiReacthookform } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { BsPinterest, BsTwitter } from "react-icons/bs";
import { TiSocialFacebook } from "react-icons/ti";
import {
  AboutAuthorTopDataType,
  BillingDataType,
  DashboardSidebarDataType,
} from "@/types";

export const billingData: BillingDataType[] = [
  {
    id: 1,
    title: "Full Name",
    name: "full_name",
  },
  {
    id: 2,
    title: "District",
    name: "district",
  },
  {
    id: 3,
    title: "City",
    name: "city",
  },
  {
    id: 4,
    title: "Postal Code",
    name: "postal_code",
  },
  {
    id: 5,
    title: "Area",
    name: "area",
  },

  {
    id: 6,
    title: "Phone",
    name: "phone",
  },
  {
    id: 7,
    title: "Email",
    name: "email",
  },
  {
    id: 8,
    title: "Alternative phone number",
    name: "alt_phone",
  },
];

export const dashboardSidebarData: DashboardSidebarDataType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: AiOutlineHome,
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Products",
    icon: SiReacthookform,
    href: "/dashboard/products",
  },
  {
    id: 2,
    title: "Orders",
    icon: AiOutlineShoppingCart,
    href: "/dashboard/orders",
  },
];

// dashboard card data

export const aboutAuthorTopData: AboutAuthorTopDataType[] = [
  { id: 1, icon: BsTwitter, link: "https://www.twitter.com" },
  { id: 2, icon: TiSocialFacebook, link: "https://www.facebook.com" },
  { id: 3, icon: AiFillInstagram, link: "https://www.instagram.com" },
  { id: 4, icon: BsPinterest, link: "https://www.pinterest.com" },
];
