import Link from "next/link";
import React from "react";
import NavBar from "./navbar";
import ThemeToggler from "../theme/themeToggleButton";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/logto";
import SignOut from "@/app/sign-out";
import SignIn from "@/app/sign-in";
import { usePathname } from "next/navigation";
import HomeLink from "./homeLink";
import { api } from "../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { PersonRole } from "@/model/dataInterfaces";
import RoleProcess from "@/model/roleProcess";
import { PathCheck } from "@/model/pathCheck";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

const Header = async () => {
  //const currentPathname = PathCheck();
  const role = await convex.query(api.role.get);
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  const persons: PersonRole[] = RoleProcess(role);
  let isAllowedToAccess: boolean = false;
  if (
    persons.find(
      (person) =>
        person.userName === claims?.username && person.role === "Admin"
    )
  ) {
    isAllowedToAccess = true;
  }

  return (
    <header className="py-8 xl:py-10 text-neutral-950 dark:text-neutral-200">
      <div className="container mx-auto flex justify-between items-center">
        <HomeLink />

        <div className="hidden md:flex items-center justify-end gap-7">
          <NavBar
            isAuthenticated={isAuthenticated}
            isAllowedToAccess={isAllowedToAccess}
          />

          {/* <div className=""> */}
          <ThemeToggler />
          <div className=" pr-1.5 pl-1.5">
            {isAuthenticated ? (
              <div className="flex flex-row items-center justify-end gap-2 pr-1.5 pl-1.5 rounded-md bg-gray-300 dark:bg-gray-800 text-blue-600 dark:text-blue-500 font-semibold">
                <p>
                  {claims?.username}
                  {" |"}
                </p>
                <SignOut
                  onSignOut={async () => {
                    "use server";

                    await signOut(logtoConfig);
                  }}
                />
              </div>
            ) : (
              <p className="text-amber-600 dark:text-amber-500 font-semibold pr-3 pl-3 rounded-md bg-gray-300 dark:bg-gray-800">
                <SignIn
                  onSignIn={async () => {
                    "use server";

                    await signIn(logtoConfig);
                  }}
                />
              </p>
            )}
          </div>

        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
