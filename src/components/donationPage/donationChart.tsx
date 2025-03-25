"use client";

import React, { useEffect, useId, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { sortYearMonth } from "@/model/sortYearMonth";
import {
  addPropertyValues,
  extractPropertyValues,
} from "@/model/mergeExpenseData";
import { chartConfig } from "../homePage/donationBarChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";




export const DonationChart = () => {
  const idD = useId();
  const [year, setYear] = useState(parseInt("2024"));
  const changeYear = (value: string) => {
    setYear(parseInt(value));
  };
  const word = () => {
    if (year === 2025) {
      return "this";
    }
    return "last";
  };

  const donationData = useQuery(api.donation.FilterYearDonationData, { year });
  const expenseData = useQuery(api.expense.FilterYearExpenseData, { year });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-items-start items-center">
            <p className="pr-3.5">Bar Chart of donation - </p>
            <Select
              defaultValue="2"
              onValueChange={(value: string) => {
                if (value === "1") {
                  changeYear("2025");
                  console.log(value, year);
                } else if (value === "2") {
                  changeYear("2024");
                  console.log(value, year);
                }
                console.log(value, year);
              }}
            >
              <SelectTrigger
                id={idD}
                className="bg-muted border-transparent shadow-none"
              >
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">2025</SelectItem>
                <SelectItem value="2">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="min-h-[600px] w-full">
          <BarChart
            className=""
            accessibilityLayer
            data={donationData}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              className="capitalize"
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis type="number" domain={[0, 20000]} allowDataOverflow />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="#1447e6" radius={8} className="">
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total donations of {word()} year
        </div>
      </CardFooter>
    </Card>
  );
};

export default DonationChart;
