import path from "path";

export type TMenu = {
  value: string;
  link: string;
  subMenu?: TMenu[];
};
export const MENU = [
  {
    value: "خانه",
    link: "",
  },
  {
    value: "آموزش",
    link: "/guide",
  },
  {
    value: "درباره دیکادو",
    link: "/about",
  },
  {
    value: "برند ها",
    link: "/brands",
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
