export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  image: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    avatar: string;
  };
}
