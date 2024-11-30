import useCartStore from "../store/useCartLocalStorage";
import ReviewOrder from "../components/checkout/ReviewOrder";
import PaymentMethod from "../components/checkout/PaymentMethod";
import useCheckout from "../utils/useCheckout";
import FormikAddress from "../components/checkout/FormikAddress";
import ConfirmedAddress from "../components/checkout/ConfirmedAddress";
import SuccessCheckoutModal from "../components/modals/SuccessCheckoutModal";

export default function Checkout() {
  const {
    cartItems,
    decrementQuantity,
    incrementQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCartStore();

  const {
    handleCheckout,
    checkoutSummary,
    handleSubmitAddress,
    addressData,
    addressStatus,
    handleChangeAddress,
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


  console.log(checkoutSummary)
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
      {addressData.length !== 0 && addressStatus.success === true ? (
       <ConfirmedAddress addressStatus={addressStatus} addressData={addressData} handleChangeAddress={handleChangeAddress}/>
      ) : (
        <FormikAddress handleSubmitAddress={handleSubmitAddress} addressData={addressData} />
      )}

      <PaymentMethod
        total={total}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleCheckout={handleCheckout}
      />
      <SuccessCheckoutModal checkoutSummary={checkoutSummary}/>
      <div></div>
    </div>
  );
}
