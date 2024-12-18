"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbCalendarClock, TbSettings } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";
import { NavNoDrop } from "./nav-nodrop";
import { useUser } from "@/context/UserContext";
import { AdminManage } from "./nav-adminManagement";
import { AdminDashboard } from "./admin-dashboard";
import { NavAdmin } from "./nav-admin";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    avatar: "/avatars/shadcn.jpg",
  },
  admin: {
    name: "Admin",
    avatar: "src/assets/logo-rxgaling.svg",
  },
  teams: [
    {
      name: "Acculife Laboratory Services",
      logo: GalleryVerticalEnd,
      plan: "Verified",
    },
  ],
  navNoDrop: [
    {
      title: "Dashboard",
      url: "/clinic-app/dashboard",
      icon: RiDashboardHorizontalLine,
      isActive: true,
    },
    {
      title: "Appointments",
      url: "/clinic-app/appointments",
      icon: TbCalendarClock,
    },
    {
      title: "Patients",
      url: "/clinic-app/patients",
      icon: RiUserHeartLine,
    },
  ],
  navMain: [
    {
      title: "Management",
      url: "#",
      icon: TbSettings,
      items: [
        {
          title: "Manage Doctors",
          url: "/clinic-app/doctor-management",
        },
        {
          title: "Manage Staff",
          url: "/clinic-app/user-management",
        },
        {
          title: "Pharmacy",
          url: "#",
        },
      ],
    },
  ],
  navAdmin: [
    {
      title: "Management",
      url: "#",
      icon: TbSettings,
      items: [
        {
          title: "Manage Clinic",
          url: "/admin/clinic-page",
        },
        {
          title: "Manage Pharmacy",
          url: "#",
        },
      ],
    },
  ],
  adminDash: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: RiDashboardHorizontalLine,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, loading, setUser, role, email } = useUser();
  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    if (role === "admin") {
      setAdmin(true);
    }
  }, [role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {!admin && <TeamSwitcher teams={data.teams} />}
      </SidebarHeader>
      <SidebarContent>
        {role === "admin" && <AdminDashboard items={data.adminDash} />}
        {role === "admin" && <AdminManage items={data.navAdmin} />}
        {!admin && <NavNoDrop items={data.navNoDrop} />}

        {!admin && <NavMain items={data.navMain} />}
      </SidebarContent>
      <SidebarFooter>
        {role === "admin" && <NavAdmin user={data.admin} email={email} />}
        {!admin && <NavUser user={data.user} email={email} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
