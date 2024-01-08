import { IProduct } from "../interface/imdex";
import { textSlice } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColors from "./CircleColors";

interface IProps {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  index:number;
  openEditProduct: (value:boolean) => void;
  setProductToEditIndex:(value:number)=>void
  openConfirmModal: () => void;

}

const ProductCard = ({ product,setEditProduct ,openEditProduct,setProductToEditIndex,openConfirmModal,index}: IProps) => {
  const { title, description, price, image, colors, category } = product;


/* Renders */
const renderProductColors = colors.map((color, index) => (
  <CircleColors
    key={`${color}-${index}`}
    color={color}
  />
));
/* Handlers */
const onEdit = () => {
  setEditProduct(product);

  openEditProduct(true)
  setProductToEditIndex(index)
};

const onRemove = () => {
  setEditProduct(product);
  openConfirmModal();
};

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image className="rounded-md h-52 w-full lg:object-cover" imageUrl={image} alt="product name" />
      <h3 className="text-lg font-semibold h-[56px] ">{textSlice(title, 25)}</h3>
      <p className="text-xs text-gray-500 h-[32px] break-words">{textSlice(description)}</p>

      <div className="flex items-center space-x-2 h-[20px]">{renderProductColors}</div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>

        <Image imageUrl={category.image} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
      </div>
      <div className=" flex items-center space-x-2 mt-4 ">
        <Button className="bg-blue-700 " onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
