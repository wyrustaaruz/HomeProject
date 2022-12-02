export type MenuChildrenType = {
  name: string;
  categories: string[];
};

export type MenuType = {
  name: string;
  img: string;
  children: MenuChildrenType[];
};
