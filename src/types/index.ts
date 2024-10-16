import { Role, User as PrismaUser, Brand } from "@prisma/client";

export type TremorColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type Permission = {
  id: string;
  isActive: boolean;
  enLabel: string;
  faLabel: string;
  subPermissions?: Permission[];
};

export type User = PrismaUser & { role?: Role; brands?: Brand[] };

export type CityWithPerformanceData = {
  CityName_En: string;
  CityName_Fa: string;
  TotalPerformance: number;
  DirectPerFormance: number;
  InDirectPerFormance: number;
};

export type TableJson = {
  title: string;
  table: {
    [key: string]: {
      data: string[];
      bgColor?: string;
      textColor?: string;
      rowClassName?: string;
      headClassName?: string;
    };
  };
};
