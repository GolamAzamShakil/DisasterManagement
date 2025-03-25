import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "../../logto";
import checkPermission from "@/model/authPolicy";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import RoleProcess from "@/model/roleProcess";
import { PersonRole } from "@/model/dataInterfaces";
import Header from "@/components/adminPage/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/adminPage/dashboardSidebar";
import { cookies } from "next/headers";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");



export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  
  const role = await convex.query(api.role.get);
  const { claims } = await getLogtoContext(logtoConfig);

  const persons: PersonRole[] = RoleProcess(role);
  let isAllowedToAccess:boolean = false;
  if (
    persons.find(
      (person) =>
        person.userName === claims?.username && person.role === "Admin"
    )
  ) {
    isAllowedToAccess = true;
  }


  return (
    <>
      
      {/* <Header /> */}
      {isAllowedToAccess ? (
        <main>
          {children}
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-600 text-3xl font-bold">
            This route is protected under Admin privileges.
          </p>
        </div>
      )}

    </>
  );
}
