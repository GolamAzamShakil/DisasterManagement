"use client";

import { NavigationRoutes } from "@/model/navigationRoutes";
import { PathCheck } from "@/model/pathCheck";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = ({ isAuthenticated, isAllowedToAccess }: { isAuthenticated: boolean | undefined, isAllowedToAccess: boolean }) => {
  const currentPathname = PathCheck();


  function pathCheck() {
    /* if (currentPathname.startsWith("/dashboard")) {
      return;
    } */

    if (isAuthenticated && isAllowedToAccess) {
      return (
        <nav className="flex gap-7">
          {NavigationRoutes.map((link, index) => {
            return (
              <Link
                href={link.link}
                key={index}
                className={`${
                  link.link === currentPathname &&
                  "text-blue-600 border-b-2 border-blue-600"
                } capitalize font-medium hover:text-blue-400 transition-all`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      );
    }

    if (!isAuthenticated && !isAllowedToAccess) {
        return (
          <nav className="flex gap-7">
            {NavigationRoutes.slice(0, -1).map((link, index) => {
              return (
                <Link
                  href={link.link}
                  key={index}
                  className={`${
                    link.link === currentPathname &&
                    "text-blue-600 border-b-2 border-blue-600"
                  } capitalize font-medium hover:text-blue-400 transition-all`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        );
      }

    return (
      <nav className="flex gap-7">
        {NavigationRoutes.slice(0, -1).map((link, index) => {
          return (
            <Link
              href={link.link}
              key={index}
              className={`${
                link.link === currentPathname &&
                "text-blue-600 border-b-2 border-blue-600"
              } capitalize font-medium hover:text-blue-400 transition-all`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return <>{pathCheck()}</>;
};

export default NavBar;

//const mappedArray = originalArray.slice(0, -1).map(item => item.toUpperCase());
