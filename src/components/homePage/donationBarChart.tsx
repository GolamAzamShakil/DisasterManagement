"use client";

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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useId, useState } from "react";

///const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

interface DataModel {
  amount: number;
  month: string;
  year: number;
}
interface ChartDataModel {
  amount: number;
  month: string;
  year: number;
  expense: number;
}
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DonationBarChart() {
  let sortedDonationData: DataModel[] | undefined;
  let sortedExpenseData: DataModel[] | undefined;
  let finalData: ChartDataModel[] | undefined;
  
  const id = useId()
  //let year = 2024;
  const [year, setYear] = useState(parseInt("2024"))
  const changeYear = (value: string) => {
    setYear(parseInt(value))
  }

  const word = () => {
    if (year === 2024) {
      return "last";
    }
    return "this";
  };

  /* const data = await convex.query(api.donation.get);
  const donationData: DonationDataType[] = DataProcess(data); */
  const donationData = useQuery(api.donation.FilterYearDonationData, { year });
  if (donationData !== undefined && typeof donationData === "object") {
    const extractedData: DataModel[] = donationData.map(
      ({ amount, month, year }) => ({ amount, month, year })
    );
    sortedDonationData = sortYearMonth(extractedData);
  }

  const expenseData = useQuery(api.expense.FilterYearExpenseData, { year });
  if (expenseData !== undefined && typeof expenseData === "object") {
    const extractedData: DataModel[] = expenseData.map(
      ({ amount, month, year }) => ({ amount, month, year })
    );
    sortedExpenseData = sortYearMonth(extractedData);
  }

  let extractExpenseAmount = extractPropertyValues(sortedExpenseData, "amount");
  finalData = addPropertyValues(sortedDonationData, extractExpenseAmount);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-items-start items-center">
            <p className="pr-3.5">Bar Chart - </p>
            <Select defaultValue="2" onValueChange={(value: string) => {
              if (value === "1") {
                changeYear("2025")
              }
              else if ( value === "2"){
                changeYear("2024")
              }
            }}>
              <SelectTrigger id={id} className="bg-muted border-transparent shadow-none">
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
            data={finalData}
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
            <YAxis type="number" domain={[6500, 25000]} allowDataOverflow />
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
            <Bar dataKey="expense" fill="#2b7fff" radius={8}>
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
        {/* <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total donations of {word()} year
        </div>
      </CardFooter>
    </Card>
  );
}
