import useCartStore from "../store/useCartLocalStorage";
import ReviewOrder from "../components/checkout/ReviewOrder";
import PaymentMethod from "../components/payment-method/PaymentMethod";
import useCheckout from "../utils/useCheckout";
import FormikAddress from "../components/checkout/FormikAddress";
import ConfirmedAddress from "../components/checkout/ConfirmedAddress";



export default function Checkout() {
  const {
    cartItems,
    decrementQuantity,
    incrementQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCartStore();

  const {
    handleSubmitAddress,
    addressData,
    addressStatus,
    handleChange,
    handleAdditionalDeliveryFee,
    total,
    additionalDeliveryFee,
    deliveryOptionsRef,
    shippingFee,
    formValue,
    paymentMethod,
    setPaymentMethod,
    errors,
    setErrors,
  } = useCheckout();


  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 p-5 text-customBrown-darkest font-thin">
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

      {/* <DeliveryAddress handleChange={handleChange} formValue={formValue}  errors={errors}/> */}
      {addressData.length !== 0 ? (
       <ConfirmedAddress addressStatus={addressStatus} addressData={addressData}/>
      ) : (
        <FormikAddress handleSubmitAddress={handleSubmitAddress} />
      )}

      <PaymentMethod
        total={total}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div></div>
    </div>
  );
}
