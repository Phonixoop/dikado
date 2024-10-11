export const MENU = [
  {
    value: "خانه",
    link: "/",
  },
  {
    value: "راهنما",
    link: "/guide",
  },
  {
    value: "درباره RAMP",
    link: "/about",
  },
  {
    value: "جزئیات عملکرد شعب",
    link: "/dashboard/depo",
  },
  {
    value: "جزئیات عملکرد پرسنل شعب",
    link: "/dashboard/personnel_performance/cities",

    subMenu: [
      {
        value: "جزئیات عملکرد پرسنل شعب (جدول)",
        link: "/dashboard/personnel_performance",
      },
      {
        value: "جزئیات ورودی اسناد مستقیم شعب",
        link: "/dashboard/personnel_performance/pishkhan",
      },
    ],
  },

  {
    value: "گیج عملکرد استان ها",
    link: "/dashboard/gauges",
  },
  {
    value: "پرسنل",
    link: "/dashboard/personnels",
  },
];
