import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Model";
import { CATEGORIES, PRODUCTS, fromInputsList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct, colors } from "./interface/imdex";
import { productValidation } from "./validation/productValidation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColors from "./components/CircleColors";
import { v4 as uuid } from "uuid";
import Select from "./components/Select";
import { productNameType } from "./types/types";

const App = () => {
  const defaultProduct = {
    category: {
      name: "",
      image: "",
    },
    colors: [],
    image: "",
    price: "",
    title: "",
    description: "",
  };

  /* State */
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [editProduct, setEditProduct] = useState<IProduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditMode, setIsOpenEditMode] = useState(false);
  const [ProductToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [tempColors, setTempColors] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  console.log(ProductToEditIndex);
  ///////////////////////////

  /* Handlers */
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setEditProduct({
      ...editProduct,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   /* Error Handler */
  //   const { description, image, price, title } = product;
  //   const errors = productValidation({
  //     title,
  //     description,
  //     image,
  //     price,
  //   });

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    /* Error Handler */
    const { description, image, price, title } = editProduct;
    const errors = productValidation({
      title,
      description,
      image,
      price,
    });

    //* Define a constant variable hasErrorMsg to store a boolean value.
    //* The value will be true if any error message is an empty string, otherwise, false.
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      //* Additional condition: Ensure that every error message is an empty string.
      //* This is a stricter check, ensuring that all error messages are empty.
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    // setProducts((prev) => [{ ...prev, ...product, id: uuid(), colors: tempColors, category: selectedCategory }]);

    const updateProducts = [...products];

    updateProducts[ProductToEditIndex] = { ...editProduct, colors: tempColors.concat(editProduct.colors) };
    setProducts(updateProducts);
    setTempColors([]);
    closeEditModal();
  };

  /////////////////////////////////////////////////////////

  /* Functions */
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeEditModal = () => {
    setIsOpenEditMode(false);
  };

  const openEditModal = () => {
    setIsOpenEditMode(true);
  };

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  };
  /////////////////////////////////////////////////////////

  /* Render */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setEditProduct={setEditProduct}
      openEditProduct={openEditModal}
      index={idx}
      setProductToEditIndex={setProductToEditIndex}
    />
  ));
  const renderProductColors = colors.map((color, index) => (
    <CircleColors
      key={`${color}-${index}`}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (editProduct.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          console.log(editProduct.id);
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderFormInputsList = fromInputsList.map((input) => (
    <div className="flex flex-col mb-3" key={input.id}>
      <label htmlFor={input.id} className="mb-1">
        {input.label}
      </label>
      <Input type="text" id={input.id} value={product[input.name]} onChange={onChangeHandler} name={input.name} />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  // const renderColors =colors.map(color=>(
  //   <CircleColors key={color} color={color} onClick={()=>{
  //     if(tempColors.includes(color)){
  //       setTempColors(prev=>prev.filter(item=>item!==color))
  //       return
  //     }
  //     setTempColors(prev=>[...prev,color])

  //   }}/>
  // ))

  const productEditRender = (id: string, label: string, name: productNameType) => {
    return (
      <div className="flex flex-col mb-3">
        <label htmlFor={id} className="mb-1">
          {label}
        </label>
        <Input type="text" name={name} id={id} value={editProduct[name]} onChange={onChangeEditHandler} />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };
  /////////////////////////////////////////////////////////

  return (
    <div>
      <main className="container">
        <Button
          className="bg-indigo-700 hover:bg-indigo-400 "
          onClick={() => {
            openModal();
          }}
        >
          OPEN
        </Button>

        <div className="m-5 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 rounded-md">
          {renderProductList}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add new product">
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderFormInputsList}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex items-center space-x-1">{renderProductColors}</div>
            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                  className="rounded-md p1 mr-1 mb-1 text-xs text-white"
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-400 ">Add</Button>
              <Button className="bg-gray-700 hover:bg-gray-400 " onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Mode  */}
        <Modal isOpen={isOpenEditMode} closeModal={closeEditModal} title="Edit product">
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {productEditRender("title", "product title", "title")}
            {productEditRender("image", "product image", "image")}
            {productEditRender("description", "product description", "description")}
            {productEditRender("price", "product price", "price")}
            <Select selected={editProduct.category} setSelected={value=>{setEditProduct({...editProduct,category:value})}} />

            <div className="flex items-center space-x-1">{renderProductColors}</div>
            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.concat(editProduct.colors).map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                  className="rounded-md p1 mr-1 mb-1 text-xs text-white"
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-400 ">Update</Button>
              <Button className="bg-gray-700 hover:bg-gray-400 " onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default App;
