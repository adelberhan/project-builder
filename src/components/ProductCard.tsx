import { IProduct } from "../interface/imdex";
import { textSlice } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { title, description, price, image, category } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image className="rounded-md h-52 w-full lg:object-cover" imageUrl={image} alt="product name" />
      <h3 className="text-lg font-semibold">{textSlice(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">{textSlice(description)}</p>

      <div className="flex items-center space-x-2">
        <span className="w-5 h-5 rounded-full bg-red-700" />
        <span className="w-5 h-5 rounded-full bg-blue-700" />
        <span className="w-5 h-5 rounded-full bg-yellow-700" />
      </div>
      <div className="flex items-center justify-between">
      <span className="text-lg text-indigo-600 font-semibold">${price}</span>
        <Image imageUrl={category.avatar} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
      </div>
      <div className=" flex items-center space-x-2 mt-4 ">
        <Button className="bg-blue-700 " onClick={() => alert("hii")}>
          EDIT
        </Button>
        <Button className="bg-red-700 ">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
