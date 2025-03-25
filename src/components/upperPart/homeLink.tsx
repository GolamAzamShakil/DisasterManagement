"use client";

import { PathCheck } from "@/model/pathCheck";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HomeLink = () => {
  const currentPathname = PathCheck();

  function pathCheck() {
    /* if (currentPathname.startsWith("/dashboard")) {
      return;
    } */
    return (
      <Link href="/">
        <h2 className="text-3xl font-semibold">Disaster Management<span className="text-5xl text-blue-500">{" ."}</span></h2>
      </Link>
    );
  }

  return <>{pathCheck()}</>;
};

export default HomeLink;
