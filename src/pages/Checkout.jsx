import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../store/useCartLocalStorage";
import ReviewOrder from "../components/cart-page/ReviewOrder";
import DeliveryAddress from "../components/cart-page/DeliveryAddress";
import PaymentMethod from "../components/payment-method/PaymentMethod";

export default function Checkout() {
  const {
    cartItems,
    decrementQuantity,
    incrementQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCartStore();

  const[additionalDeliveryFee, setAdditionalDeliveryFee] = useState(0)
  const [shippingFee, setShippingFee] = useState(0);

  const total = (getTotalPrice() + shippingFee + additionalDeliveryFee).toFixed(2) ;
  const freeShippingThreshhold = 1000;
  const deliveryOptionsRef = {
    regular: useRef(null),
    fast: useRef(null),
    express: useRef(null),
  };

 
  const handleAdditionalDeliveryFee = (option) =>{
    if(option === "regular"){
        setAdditionalDeliveryFee(Number(deliveryOptionsRef.regular.current.value))
    } else if (option === 'fast'){
        setAdditionalDeliveryFee(Number(deliveryOptionsRef.fast.current.value))
    } else if(option === 'express') {
        setAdditionalDeliveryFee(Number(deliveryOptionsRef.express.current.value))
    }
  }

  useEffect(() => {
    if (getTotalPrice() > freeShippingThreshhold) {
      setShippingFee(0);
    } else if (getTotalPrice() < freeShippingThreshhold) {
      setShippingFee(150);
    }
  }, [getTotalPrice()]);
  console.log(additionalDeliveryFee)
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 p-5 text-customBrown-darkest">
        <ReviewOrder 
        handleAdditionalDeliveryFee={handleAdditionalDeliveryFee}
        cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        removeFromCart={removeFromCart}
        total={total}
        shippingFee={shippingFee}
        deliveryOptionsRef={deliveryOptionsRef}
        additionalDeliveryFee={additionalDeliveryFee}
        getTotalPrice={getTotalPrice}
        />
      <DeliveryAddress />
      <PaymentMethod total={total}/>
      <div></div>
    </div>
  );
}

