import { useContext } from "react";
import { BookContext } from "../BookContext";

export const ProductItem = ({ title, photo, id, price }) => {
  const { dispatch } = useContext(BookContext);
  return (
    <>
      <div className="list">
        <img src={photo} />
        <p>{title}</p>
        <p>
          <strong>{price}</strong>
        </p>

        <button onClick={() => dispatch({ type: "MOVE", payload: id })}>
          Move
        </button>
      </div>
    </>
  );
};
