"use client";

import { useQuery } from "convex/react";
import React, { useEffect, useId, useState } from "react";
import { CrisisApiCall } from "@/model/crisisApi";
import { DataTable } from "@/components/ui/data-table";
import { ColumnStructure } from "@/components/crisisPage/columnStructure";
import CrisisForm from "@/components/crisisPage/crisisForm";
import { SwitchForm } from "@/components/crisisPage/switchFormDemo";

const Crisis = () => {

  return (
    <div className="max-w-[95%] mx-auto">
      <div className="">
        <DataTable columns={ColumnStructure} data={CrisisApiCall()} />
      </div>
      <div className="pt-20">
        <CrisisForm />
      </div>
    </div>
  );
};

export default Crisis;
