export const productValidation = (product: { title: string; description: string; image: string; price: string }) => {
  const errors: { id: string; title: string; description: string; image: string; price: string } = {
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
  };
  const validImgUrl = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi

  if (!product.title.trim()||product.title.length<10||product.title.length>80) {
    errors.title= "Title should be between 10 and 80 characters long.\n";
   
  }
  if (!product.description.trim()||product.description.length<10||product.description.length>900) {
    errors.description="Description should be between 10 and 900 characters long.";
  }
  if (!product.image.trim() || !validImgUrl) {
    errors.image = "Image URL must be a valid image url";
  }
  if (!product.price.trim() || isNaN(+product.price)) {
    errors.price = "Price should be number";
  }
  return errors;
};
