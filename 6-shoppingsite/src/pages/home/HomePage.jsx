import axios from "axios";
import { Header } from "../../components/Header.jsx";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid.jsx";


export function HomePage({ cart }) {
  const [products, setProducts] = useState([]); // Gives us an array of 2 values // is the starting valus of the products

  useEffect( () => {
    const fetchHomeData = async () => {
      const response = await axios.get("/api/products") 
      // Asynchronous code =>> code that doesn't finish right away {request} {a promise}
      // now responce is not the data so we use the .json to get the data
      // gives us the data attached to the response and this is also a promise so we have to use (.then)
      // response.json().then((data) => {})
      // to not breaking the rules of useEffect we put a function inside it so it doesn't return a promise 
        setProducts(response.data);
    };

    fetchHomeData();
    
  }, []); //dependancy array if empty array this will let the code run onec and only once and that's what we want
  // in the console it's run 2wice because of StrictMode and this helps use find bugs

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products = {products} />
      </div>
    </>
  );
}
