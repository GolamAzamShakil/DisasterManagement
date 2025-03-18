import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

interface Donation {
    id: number,
    donar?: string,
    amount: string,
}

export function DataProcess(JsonData: any): Donation[] {
    try {
        if (Array.isArray(JsonData)) {
          return JsonData.map(
            (item: any): Donation => ({
              id: item._id,
              donar: item.donar,
              amount: item.amount,
            })
          );
        } else {
          throw new Error("The JSON response is not an array.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
}

export async function DonationData() {
    const data = useQuery(api.donation.GetDonationData);
    const donation: Donation[] = DataProcess(data);
    return donation;
}

export default DonationData;