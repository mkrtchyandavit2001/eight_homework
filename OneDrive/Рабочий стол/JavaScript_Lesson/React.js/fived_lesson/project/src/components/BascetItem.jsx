import { useContext } from "react";
import { BookContext } from "../BookContext";

export const BascetItem = ({ title, price, count, id }) => {
  const { dispatch } = useContext(BookContext);
  return (
    <tr>
      <td>{title}</td>
      <td>{price}</td>
      <td>{count}</td>
      <td>{count * price}</td>
      <td>
        <button onClick={() => dispatch({ type: "ADD", payload: id })}>
          Add
        </button>
        <button onClick={() => dispatch({ type: "REDUCE", payload: id })}>
          Reduce
        </button>
        <button onClick={() => dispatch({ type: "DELETE", payload: id })}>
          Delete
        </button>
      </td>
    </tr>
  );
};
