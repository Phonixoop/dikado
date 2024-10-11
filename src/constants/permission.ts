import { Permission } from "~/types";

export const PERMISSIONS: Permission[] = [
  {
    id: "ViewAdmin",
    isActive: false,
    enLabel: "View Admin",
    faLabel: "دسترسی ادمین",
  },
  {
    id: "ViewDashboard",
    isActive: false,
    enLabel: "View Dashboard",
    faLabel: "نمایش داشبورد",
    subPermissions: [
      {
        id: "ViewCharts",
        isActive: false,
        enLabel: "View Charts",
        faLabel: "نمایش نمودار ها",
      },
      {
        id: "ViewTable",
        isActive: false,
        enLabel: "View Table",
        faLabel: "نمایش جدول",
      },
    ],
  },
  {
    id: "ManageUsers",
    isActive: false,
    enLabel: "Manage Users",
    faLabel: "مدیریت کاربر ها",
  },
  //   {
  //     id: "ManagePersonnel",
  //     isActive: false,
  //     enLabel: "Manage Personnel",
  //     faLabel: "مدیریت پرسنل",
  //   },
  //   {
  //     id: "ViewCities",
  //     isActive: false,
  //     enLabel: "View Cities",
  //     faLabel: "نمایش استان ها",
  //     subPermissions: CITIES.map((a, i) => {
  //       return {
  //         id: `View_${a.EnglishName.replace(" ", "_")}_${i}`,
  //         isActive: false,
  //         enLabel: a.EnglishName,
  //         faLabel: a.PersianName,
  //       };
  //     }),
  //   },
];
