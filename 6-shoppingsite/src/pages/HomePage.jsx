import axios from 'axios';
import { Header } from '../components/Header'
import { useEffect, useState } from 'react';
import "./HomePage.css";
import { formatMoney } from '../utils/money.js'


export function HomePage({ cart }) {

  const [products, setProducts] = useState([]); // Gives us an array of 2 values // is the starting valus of the products


  useEffect(() => {
    axios
      .get("/api/products") // Asynchronous code =>> code that doesn't finish right away {request} {a promise}
      // now responce is not the data so we use the .json to get the data
      // gives us the data attached to the response and this is also a promise so we have to use (.then)
      // response.json().then((data) => {})
      .then((response) => {
        setProducts(response.data);
      });

      
  }, []) //dependancy array if empty array this will let the code run onec and only once and that's what we want
  // in the console it's run 2wice because of StrictMode and this helps use find bugs 



  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">{product.rating.count}</div>
                </div>

                <div className="product-price">{formatMoney(product.priceCents)}</div> 

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
          {/* We want to generate some html */}

        </div>
      </div>
    </>
  );
}
