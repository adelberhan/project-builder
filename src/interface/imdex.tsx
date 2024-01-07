import { productNameType } from "../types/types";

export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  image: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    image: string;
  };
}

export interface IFormInput {
  id: string;
  name: productNameType
  label: string;
  type: string;
}

export const colors: string[] = [
  "#a855f7",
  "#84D2C5",
  "#13005A",
  "#A31ACB",
  "#FF6E31",
  "#3C2A21",
  "#6C4AB6",
  "#CB1C8D",
  "#000000",
  "#645CBB",
  "#1F8A70",
  "#2563eb",
  "#820000",
  "#FF0032",
];

export interface ICategory {
  id:string,
  name:string,
  image:string
}