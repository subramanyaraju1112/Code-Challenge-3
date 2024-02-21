import React, { useEffect, useState } from "react";
import "./style.css";
import MRF from "../assets/images/mrf.png";
import CEAT from "../assets/images/ceat.png";
import APOLLO from "../assets/images/apollo.png";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product A",
      price: 50,
      quantity: 1,
      img: MRF,
    },
    {
      id: 2,
      name: "Product B",
      price: 30,
      quantity: 1,
      img: CEAT,
    },
    {
      id: 3,
      name: "Product C",
      price: 40,
      quantity: 1,
      img: APOLLO,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    updateCartTotal();
  }, [cart, discount]);

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCart(updatedCart);
  };

  const updateDiscount = (e) => {
    const { value } = e.target;
    setDiscount(value);
  };

  const updateCartTotal = () => {
    const totalBeforeDiscount = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    const discountAmount = (totalBeforeDiscount * discount) / 100;
    const discountedTotal = totalBeforeDiscount - discountAmount;

    console.log("Total Before Discount:", totalBeforeDiscount);
    setSubTotal(totalBeforeDiscount);
    console.log("Discounted Total:", discountedTotal);
    setTotal(discountedTotal);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
      <div className="mt-8">
        {cart.map((product) => {
          return (
            <div
              className="flex flex-col md:flex-row border-b border-gray-400 py-4"
              key={product.id}
            >
              <div className="flex-shrink-0">
                <img
                  src={product.img}
                  alt="Product image"
                  className="w-32 h-32 object-cover"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-gray-600">Quantity:</span>
                  <input
                    className="input-field"
                    type="number"
                    placeholder="Enter QTY"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.id, e.target.value)}
                  />
                  <span className="ml-auto font-bold">${product.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end items-center mt-8">
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-gray-600 mr-4">Subtotal:</span>
            <span className="text-xl font-bold">$ {subTotal}</span>
          </div>
          <div>
            <span className="text-gray-600 mr-4">Discount:</span>
            <input
              className="input-field"
              type="number"
              placeholder="%"
              value={discount}
              onChange={updateDiscount}
            />
          </div>
          <div>
            <span className="text-xl font-bold mr-4">TOTAL:</span>
            <span className="text-xl font-bold">$ {total} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
