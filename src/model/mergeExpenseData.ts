interface DataModel {
    amount: number;
    month: string;
    year: number;
}

interface ChartDataModel extends DataModel {
    expense: number;
}

export function MergeExpenseData(source: DataModel[]): ChartDataModel[] {
    return source.map((item) => ({
      ...item,
      expense: 0,
    }));
}

/* export function extractPropertyValues(source: DataModel[], property: keyof DataModel): any[] {
    return source.map(item => item[property]);
} */

export function extractPropertyValues(source: DataModel[] | undefined, property: keyof DataModel): any[] {
        if (!source) return []; // If array is undefined, return an empty array
        return source.map(item => item[property]);
}

export function addPropertyValues(source: DataModel[] | undefined, values: number[]): ChartDataModel[] {
    if (!source) return [];
    return source.map((item, index) => ({
      ...item,
      expense: values[index],
    }));
}