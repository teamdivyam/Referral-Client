// src/components/ProtectedRoute.jsx
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Bell, Clipboard, House, Settings, User, Wallet } from "lucide-react";
import Loading from "../components/loading";

import { ProfileDropdownMenu } from "../components/ProfileDropdownMenu";

const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: <House size={18} />,
      url: "/dashboard/overview",
      items: [
        {
          sidebar: true,
          title: "Overview",
          url: "/dashboard/overview",
        },
      ],
    },
    {
      title: "Wallet",
      icon: <Wallet size={18} />,
      url: "/wallet/wallet-overview",
      items: [
        {
          sidebar: true,
          title: "Overview",
          url: "/wallet/wallet-overview",
        },
        {
          sidebar: true,
          title: "Request Withdrawal",
          url: "/wallet/request-withdrawal",
        },
      ],
    },
    {
      title: "Referral",
      url: "/referral/my-referrals",
      icon: <Clipboard size={18} />,
      items: [
        {
          sidebar: true,
          title: "My Referrals",
          url: "/referral/my-referrals",
        },
        {
          sidebar: true,
          title: "Referral Guide",
          url: "/referral/referral-guide",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings/profile-information",
      icon: <Settings size={18} />,
      items: [
        {
          sidebar: true,
          title: "Profile Information",
          url: "/settings/profile-information",
        },
        {
          sidebar: true,
          title: "Bank Details",
          url: "/settings/bank-details",
        },
        {
          sidebar: true,
          title: "Terms & Conditions",
          url: "/terms-and-conditions",
        },
        {
          sidebar: false,
          title: "Notifications",
          url: "/settings/notifications",
        },
      ],
    },
  ],
};

const ProtectedRoute = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return (
    <SidebarProvider>
      <AppSidebar
        data={data}
        logout={logout}
      />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex justify-between items-center w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>
                    {location.pathname
                      .split("/")[1]
                      .replace(
                        /(?:^|-)([a-z])/g,
                        (_, letter) => ` ${letter.toUpperCase()}`
                      )
                      .trim()}{" "}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {location.pathname.split("/").length > 2 && location.pathname
                      .split("/")[2]
                      .replace(
                        /(?:^|-)([a-z])/g,
                        (_, letter) => ` ${letter.toUpperCase()}`
                      )
                      .trim()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4.5 pr-2.5 lg:gap-8 lg:pr-4">
              <Link
                to="/settings/notifications"
                className="relative cursor-pointer"
              >
                <Bell size={25} color="gray" />
                {user.unreadNotificationCount !== 0 && (
                  <div className="absolute flex justify-center items-center size-5 bg-purple-500 text-white border border-white rounded-full text-xs -top-1.5 -right-1 z-10">
                    {user.unreadNotificationCount}
                  </div>
                )}
              </Link>
              <ProfileDropdownMenu />
            </div>
          </div>
        </header>
        <div className="w-full h-full bg-muted">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
