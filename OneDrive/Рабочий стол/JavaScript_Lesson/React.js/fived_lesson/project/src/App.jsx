import { useReducer } from "react";
import { BookContext, inisealState, reducer } from "./BookContext";
import "./App.css";
import { Bascet } from "./components/Bascet";
import { ProductList } from "./components/ProductList";

function App() {
  const [state, dispatch] = useReducer(reducer, inisealState);

  return (
    <>
      <div className="row">
        <BookContext.Provider value={{ state, dispatch }}>
          <ProductList />
          <Bascet />
        </BookContext.Provider>
      </div>
    </>
  );
}

export default App;
