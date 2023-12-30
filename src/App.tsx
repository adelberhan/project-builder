import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Model";
import { PRODUCTS, fromInputsList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interface/imdex";
import { productValidation } from "./validation/productValidation";
import ErrorMsg from "./components/ErrorMsg";

const App = () => {
  const defaultProduct = {
    category: {
      name: "",
      avatar: "",
    },
    colors: [],
    image: "",
    price: "",
    title: "",
    description: "",
  };
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

  /* State */
  const [isOpen, setIsOpen] = useState(true);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  console.log(errors);

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal;
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    /* Error Handler */
    const { description, image, price, title } = product;
    const errors = productValidation({
      title,
      description,
      image,
      price,
    });

    // Define a constant variable hasErrorMsg to store a boolean value.
    // The value will be true if any error message is an empty string, otherwise, false.
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      // Additional condition: Ensure that every error message is an empty string.
      // This is a stricter check, ensuring that all error messages are empty.
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    console.log("Success");
  };

  const [product, setProduct] = useState<IProduct>(defaultProduct);

  /* Functions */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  /* Render */
  const renderProductList = PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />);
  const renderFormInputsList = fromInputsList.map((input) => (
    <div className="flex flex-col mb-3" key={input.id}>
      <label htmlFor={input.id} className="mb-1">
        {input.label}
      </label>
      <Input type="text" id={input.id} value={product[input.name]} onChange={onChangeHandler} name={input.name} />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  return (
    <div>
      <main className="container">
        <div className="m-5 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 rounded-md">
          {renderProductList}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add new product">
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputsList}
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-400 ">Add</Button>
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
