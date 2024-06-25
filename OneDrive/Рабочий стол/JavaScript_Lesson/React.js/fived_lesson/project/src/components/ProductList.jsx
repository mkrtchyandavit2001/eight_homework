import { ProductItem } from "./ProductItem";
import { BookContext } from "../BookContext";
import { useContext } from "react";

export const ProductList = () => {
  const {
    state: { product },
  } = useContext(BookContext);
  return (
    <>
      <h3>Product List</h3>
      {product.map((elm) => (
        <ProductItem key={elm.id} {...elm} />
      ))}
    </>
  );
};
