import ChartContainer from "@/components/homePage/chartContainer";
import { DonationBarChart } from "@/components/homePage/donationBarChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center">
          <ChartContainer title="Bar Chart of all time donations and expenses">
            <DonationBarChart />
          </ChartContainer>
          <div className="pt-3">
            <Button
              asChild
              className="p-4 bg-blue-700 text-white hover:text-black"
            >
              <Link href="/donation">Details</Link>
            </Button>
          </div>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  );
}
