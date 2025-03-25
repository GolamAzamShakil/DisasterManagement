import { Calendar, Home, Inbox, Search, Settings, LayoutDashboard, CloudAlert, User } from "lucide-react"

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
} from "@/components/ui/sidebar"
import Link from "next/link"


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Crisis",
    url: "/dashboard/crisis",
    icon: CloudAlert,
  },
  {
    title: "Volunteer",
    url: "/dashboard/volunteer",
    icon: User,
  },
  /* {
    title: "",
    url: "#",
    icon: ,
  },
  {
    title: "",
    url: "",
    icon: ,
  }, */
]

export function DashboardSidebar() {
  return (
    <Sidebar side="left" variant="floating">
        <SidebarHeader>
        <Link href="/">
        <h2 className="text-2xl font-semibold">Disaster Management<span className="text-5xl text-blue-500">{" ."}</span></h2>
      </Link>
        </SidebarHeader>
      <SidebarContent>
      <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
