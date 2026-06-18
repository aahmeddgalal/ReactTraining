import dayjs from "dayjs";
import axios from 'axios'
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function OrderSummary({cart, deliveryOptions, loadCart}) {

    const [editingProductId, setEditingProductId] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    return (
    <div className="order-summary">
    {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
        const selectedDeliveryDate = deliveryOptions.find(
            (deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
            },
        );

        const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
        }






        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date:{" "}
              {dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format(
                "dddd, MMMM D",
              )}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>Quantity: </span>

                  {editingProductId === cartItem.productId ? (
                    <>
                      <input
                        type="number"
                        min="1"
                        value={newQuantity}
                        onChange={(e) => {
                          setNewQuantity(Number(e.target.value));
                        }}
                      />

                      <button
                        onClick={async () => {
                          await axios.put(
                            `/api/cart-items/${cartItem.productId}`,
                            {
                              quantity: newQuantity,
                            },
                          );

                          await loadCart();

                          setEditingProductId(null);
                        }}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>

                      <span
                        className="update-quantity-link link-primary"
                        onClick={() => {
                          setEditingProductId(cartItem.productId);
                          setNewQuantity(cartItem.quantity);
                        }}
                      >
                        Update
                      </span>
                    </>
                  )}

                  <span
                    className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>

                {deliveryOptions.map((deliveryOption) => {
                  let priceString = "FREE SHIPPING";

                  if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                  }

                  const updateDeliveryOptions = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                      deliveryOptionId: deliveryOption.id,
                    });
                    await loadCart();
                  };

                  return (
                    <div
                      key={deliveryOption.id}
                      className="delivery-option"
                      onClick={updateDeliveryOptions}
                    >
                      <input
                        type="radio"
                        checked={
                          deliveryOption.id === cartItem.deliveryOptionId
                        }
                        onChange={() => {}}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`}
                      />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                            "dddd, MMMM D",
                          )}
                        </div>
                        <div className="delivery-option-price">
                          {priceString}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
        })}
    </div>
    );
}