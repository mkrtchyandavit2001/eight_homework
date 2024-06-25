import { BascetItem } from "./BascetItem";
import { BookContext } from "../BookContext";
import { useContext } from "react";

export const Bascet = () => {
  const {
    state: { bascet },
  } = useContext(BookContext);

  return (
    <div>
      <h3>Bascet</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Count</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bascet.map((elm) => (
            <BascetItem key={elm.id} {...elm} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
