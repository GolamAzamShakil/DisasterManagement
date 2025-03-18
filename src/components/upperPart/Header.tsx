import Link from "next/link";
import React from "react";
import NavBar from "./navbar";
import ThemeToggler from "../theme/themeToggleButton";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/logto";
import SignOut from "@/app/sign-out";
import SignIn from "@/app/sign-in";

const Header = async () => {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  return (
    <header className="py-8 xl:py-12 text-neutral-950 dark:text-neutral-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h2 className="text-3xl font-semibold">Disaster Management.</h2>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <NavBar />
          <ThemeToggler />
          <div className="pr-1.5 pl-1.5">
            {isAuthenticated ? (
              <div className="flex flex-row items-center gap-2 pr-1.5 pl-1.5 rounded-md bg-gray-300 dark:bg-gray-800 text-blue-600 dark:text-blue-500 font-semibold">
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
    </header>
  );
};

export default Header;
