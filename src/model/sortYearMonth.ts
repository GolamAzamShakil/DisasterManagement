/* interface Data {
  value: number;
  month: number;
  year: number;
}

function sortAndSumData(data: Data[]): Data[] {
  // Sort the data by year and month
  data.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  // Group data by month and year, summing values for duplicates
  const groupedData: { [key: string]: number } = {};
  const result: Data[] = [];

  data.forEach((item) => {
    const key = `${item.year}-${item.month}`;
    if (groupedData[key]) {
      groupedData[key] += item.value;
    } else {
      groupedData[key] = item.value;
    }
  });

  // Convert grouped data back into an array of objects
  Object.keys(groupedData).forEach((key) => {
    const [year, month] = key.split("-").map(Number);
    result.push({ value: groupedData[key], month, year });
  });

  return result;
} */

interface Data {
  amount: number;
  month: string;
  year: number;
}

export function sortYearMonth(data: Data[]): Data[] {
  // Define a mapping for month abbreviations to their numerical order
  const monthOrder: { [key: string]: number } = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };

  // Sort the data by year and month
  data.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthOrder[a.month] - monthOrder[b.month];
  });

  // Group data by month and year, summing values for duplicates
  const groupedData: { [key: string]: number } = {};
  const result: Data[] = [];

  data.forEach((item) => {
    const key = `${item.year}-${item.month}`;
    if (groupedData[key]) {
      groupedData[key] += item.amount;
    } else {
      groupedData[key] = item.amount;
    }
  });

  // Convert grouped data back into an array of objects
  Object.keys(groupedData).forEach((key) => {
    const [year, month] = key.split("-");
    result.push({ amount: groupedData[key], month, year: Number(year) });
  });

  return result;
}

export default sortYearMonth;
  
