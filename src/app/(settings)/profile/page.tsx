import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "../../logto";
import checkPermission from "@/model/authPolicy";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import RoleProcess from "@/model/roleProcess";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export default async function profile() {
  interface Person {
    id: number;
    email: string;
    userName: string;
    role: string;
  }

  const tasks = await convex.query(api.tasks.get);
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

  return <></>;
}
