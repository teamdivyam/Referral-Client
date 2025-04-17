import * as React from "react";
import { ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import AnimateBtn from "./buttons/AnimateBtn";

// This is sample data.

export function AppSidebar({
  data,
  logout,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-purple-600 text-white py-4">
        <div className="pl-2">
          <h1 className="text-xl font-semibold">Divyam Pvt Ltd</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-4 gap-0 bg-white">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item, currentPageIndex) => (
          <Collapsible
            key={item.title}
            title={item.title}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <div className="flex items-center justify-between cursor-pointer">
                  <Link
                    to={item.url}
                    className="flex items-center gap-2"
                  >
                    {item.icon}
                    <p className="font-normal text-base text-gray-600 font-semibold">{item.title}</p>
                  </Link>
                  <CollapsibleTrigger>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </div>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0">
                    {item.items.map(
                      (item, subCurrentPageIndex) =>
                        item.sidebar && (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.isActive}
                              className="pl-8.5"
                            >
                              <Link
                                to={item.url}
                                className="text-base text-gray-500"
                              >
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <AnimateBtn
          onClick={() => {
            logout();
          }}
          title="Logout"
          icon={<LogOut />}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
