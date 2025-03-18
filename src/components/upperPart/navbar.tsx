"use client"

import { NavigationRoutes } from "@/model/navigationRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathName = usePathname();

    return (
        <nav className="flex gap-7">
            {NavigationRoutes.map((link, index) => {
                return (
                    <Link href={link.link} key={index} className={`${link.link === pathName && "text-blue-600 border-b-2 border-blue-600"} capitalize font-medium hover:text-blue-400 transition-all`}>
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavBar;