import path from "path";

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

export const ADMIN_UPLOADS = path.join(process.cwd(), "/uploads");
export const ADMIN_MENU_LIST = [
  {
    value: "کاربر ها",
    link: "users",
    description: `در این بخش می توانید کاربر های مد نظر خود را بسازید، ویرایش کنید و
    یا حذف کنید و تنظیمات مربوط به آن ها را تغییر دهید`,
  },

  {
    value: "سمت ها",
    description: `در این بخش می توانید سمت های مد نظر خود را بسازید تا در بخش کاربر ها برای آن ها اعمال کنید`,
    link: "roles",
  },

  {
    value: "دسته بندی ها",
    description: `در این بخش می توانید بر روی دسته بندی ها ویرایش های لازم را انجام دهید`,
    link: "categories",
  },
  {
    value: "برند ها",
    description: `در این بخش می توانید بر روی برند ها ویرایش های لازم را انجام دهید`,
    link: "brands",
  },
  {
    value: "رسانه ها",
    description: `در این بخش می توانید بر روی رسانه ها  ویرایش های لازم را انجام دهید`,
    link: "files",
  },
];
