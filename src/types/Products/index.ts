export type ProductType = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
};

export type ProductDetailType = ProductType;

export type CartType = ProductType & {
  quantity: number;
};
