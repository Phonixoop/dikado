import { ClassValue, clsx } from "clsx";
import moment from "jalali-moment";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniqueArray<T>(array): T[] {
  return Array.from(new Set(array));
}

interface UniqueResult<T> {
  result: T[];
  counts: { [key: string]: number };
}

export function uniqueArrayWithCounts<T>(array: T[]): UniqueResult<T> {
  const uniqueItems = Array.from(new Set(array));
  const counts: { [key: string]: number } = {};

  // Count occurrences of each item
  array.forEach((item) => {
    const key = String(item);
    counts[key] = (counts[key] || 0) + 1;
  });

  return { result: uniqueItems, counts };
}

export function groupBy<T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => any,
): Partial<Record<any, T[]>> {
  const grouped: Partial<Record<any, T[]>> = {};

  let index = 0;
  for (const item of items) {
    const key = keySelector(item, index);
    if (!(key in grouped)) {
      grouped[key] = [];
    }
    grouped[key]!.push(item);
    index++;
  }

  return grouped;
}

export function sortDates({
  dates,
  format = "YYYY/MM/DD",
}: {
  dates: string[] | unknown[];
  format?: string;
}): string[] {
  // Convert strings to Moment.js objects
  const momentObjects: moment.Moment[] = dates.map((date) =>
    moment(date, format),
  );

  // Sort Moment.js objects
  momentObjects.sort((a, b) => a.diff(b));

  // If you want the sorted dates back in string format
  const sortedDates: string[] = momentObjects.map((momentObject) =>
    momentObject.format(format),
  );

  return sortedDates;
}

// export function validateFileType(file: File) {
//   return ALLOWED_FILE_TYPES.includes(file.type);
// }

export function generateUUID() {
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
  return uuid;
}

export function generateDefaultObjectFromZod(schema: z.ZodTypeAny): any {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    return Object.keys(shape).reduce((acc, key) => {
      acc[key] = generateDefaultObjectFromZod(shape[key]);
      return acc;
    }, {} as any);
  } else if (schema instanceof z.ZodString) {
    return "";
  } else if (schema instanceof z.ZodNumber) {
    return 0;
  } else if (schema instanceof z.ZodBoolean) {
    return false;
  }
  // Add other Zod types as needed
  return null;
}
