type menuItemType = {
  title: string;
  href?: string;
  children?: { title: string; href: string }[];
}[];

export const menuItems: menuItemType = [
  {
    title: "Explore",
    href: "explore",
  },
  {
    title: "Stats",
    href: "getSetSum",
    children: [
      { title: "getSetSum", href: "getSetSum" },
      { title: "actitvy", href: "actitvy" },
      { title: "mint", href: "mint" },
    ],
  },
  {
    title: "Collections",
    href: "collections",
  },
  {
    title: "Create",
    href: "wallet",
  },
];
