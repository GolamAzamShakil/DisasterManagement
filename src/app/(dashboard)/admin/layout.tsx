import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "../../logto";
import checkPermission from "@/model/authPolicy";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import RoleProcess from "@/model/roleProcess";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

interface Person {
  id: number;
  email: string;
  userName: string;
  role: string;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await convex.query(api.role.get);
  const { claims } = await getLogtoContext(logtoConfig);

  const persons: Person[] = RoleProcess(role);
  let isAllowedToAccess = false;
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
      {isAllowedToAccess ? (
        <main>{children}</main>
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
