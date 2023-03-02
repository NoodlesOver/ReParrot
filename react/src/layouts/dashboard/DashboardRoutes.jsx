import React from "react";
import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 * 				: Object - Icon as an object added from v1.4.0.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

import Icon from "@mdi/react";
import { mdiPenPlus, mdiStoreSearch } from "@mdi/js";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    roles: ["SysAdmin"],
    children: [
      {
        id: uuid(),
        link: "/dashboard/analytics",
        name: "Analytics",
        roles: ["SysAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Auto Services",
    icon: "book",
    roles: [],
    children: [
      { id: uuid(), link: "/autoservices", name: "Services", roles: [] },
      {
        id: uuid(),
        link: "/autoservices/add",
        name: "Add Service",
        roles: ["SysAdmin", "OrgAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Subscriptions",
    icon: "monitor",
    roles: ["Customer"],
    children: [
      {
        id: uuid(),
        link: "/subscribe",
        name: "Subscribe",
        roles: ["Customer"],
      },
      {
        id: uuid(),
        link: "/addpaymentaccount",
        name: "Add Payment Account",
        roles: ["OrgAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Price Check",
    icon: "book-open",
    roles: [],
    children: [
      { id: uuid(), link: "/pricings", name: "Pricing List", roles: [] },
      {
        id: uuid(),
        link: "/pricings/add",
        name: "Add Pricing",
        roles: ["SysAdmin", "OrgAdmin", "OrgMember"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Blogs",
    icon: "book",
    roles: [],
    children: [
      {
        id: uuid(),
        link: "/blogs",
        name: "Blogs",
        roles: [],
      },
      {
        id: uuid(),
        link: "/blogs/form",
        name: "Create New Blog",
        roles: ["SysAdmin", "Blogger"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Comments",
    icon: "book-open",
    roles: [],
    children: [{ id: uuid(), link: "/comments", name: "Comments", roles: [] }],
  },
  {
    id: uuid(),
    title: "Authentication",
    icon: "lock",
    roles: [],
    children: [
      { id: uuid(), link: "/register", name: "Registration", roles: [] },
      { id: uuid(), link: "/login", name: "Sign In", roles: [] },
      { id: uuid(), link: "/lostpassword", name: "Forgot Password", roles: [] },
    ],
  },
  {
    id: uuid(),
    title: "Auto Repair Shops",
    icon: <Icon path={mdiStoreSearch} className="nav-icon me-2" size={0.8} />,
    link: "/organizations",
    roles: ["SysAdmin", "OrgAdmin", "Customer"],
  },
  {
    id: uuid(),
    title: "Add Organization",
    icon: <Icon path={mdiPenPlus} className="nav-icon me-2" size={0.8} />,
    link: "/organization/add",
    roles: [],
  },
  {
    id: uuid(),
    title: "Schedules",
    icon: "calendar",
    roles: ["OrgAdmin"],
    children: [
      {
        id: uuid(),
        link: "/schedules/add",
        name: "Add Schedule",
        roles: ["OrgAdmin"],
      },
      {
        id: uuid(),
        link: "/schedules/view",
        name: "View Schedule",
        roles: ["OrgAdmin"],
      },
    ],
  },

  {
    id: uuid(),
    title: "Appointments",
    icon: "calendar",
    roles: ["SysAdmin", "OrgAdmin", "Customer"],
    children: [
      {
        id: uuid(),
        link: "/appointment/add",
        name: "Add Appointment",
        roles: ["SysAdmin", "OrgAdmin", "Customer"],
      },
      {
        id: uuid(),
        link: "/appointments",
        name: "View Appointments",
        roles: ["SysAdmin", "OrgAdmin", "Customer"],
      },
    ],
  },

  {
    id: uuid(),
    title: "Apps",
    grouptitle: true,
    roles: [],
  },
  {
    id: uuid(),
    title: "Chat",
    icon: "message-square",
    link: "/chat",
    badge: "New",
    badgecolor: "success",
    roles: [],
  },
  {
    id: uuid(),
    title: "Files",
    icon: "book",
    link: "/upload",
    roles: ["SysAdmin"],
  },

  {
    id: uuid(),
    title: "Help",
    grouptitle: true,
    roles: [],
  },
  {
    id: uuid(),
    title: "Contact Us",
    icon: "help-circle",
    link: "/contactus",
    roles: [],
  },
];

export default DashboardMenu;
