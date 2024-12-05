import useCartStore from "../store/useCartLocalStorage";
import ReviewOrder from "../components/checkout/ReviewOrder";
import PaymentMethod from "../components/checkout/PaymentMethod";
import useCheckout from "../utils/useCheckout";
import FormikAddress from "../components/checkout/FormikAddress";
import ConfirmedAddress from "../components/checkout/ConfirmedAddress";
import SuccessCheckoutModal from "../components/modals/SuccessCheckoutModal";
import ErrorCheckoutModal from "../components/modals/ErrorCheckout";
import Loader from "../components/loader/Loader";
import { useAuthStore } from "../store/useAuthStore";

export default function Checkout() {
  const { user } = useAuthStore();
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
    errorInHadleCheckout,
    isLoading,
  } = useCheckout();

  // console.log(checkoutSummary)
  // console.log(errorInHadleCheckout)
  return (
    <>
      {user && cartItems.length === 0 && (
        <div className="w-screen h-screen bg-gray-100 pt-20 p-10">
          <h1 className="font-bold mx-auto text-center text-customBrown-darkest text-xl ">
            Checkout Cart is Empty. Please Add Products to Cart for Checkout
          </h1>
        </div>
      )}
      {!user ? (
        <div className="w-full h-screen">
          <h1 className="font-bold mt-10 mx-auto text-center text-customBrown-darkest text-xl">
            Please Login first to Checkout
          </h1>
        </div>
      ) : (
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
            <ConfirmedAddress
              addressStatus={addressStatus}
              addressData={addressData}
              handleChangeAddress={handleChangeAddress}
            />
          ) : (
            <FormikAddress
              handleSubmitAddress={handleSubmitAddress}
              addressData={addressData}
            />
          )}

          <PaymentMethod
            total={total}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            handleCheckout={handleCheckout}
          />
          <ErrorCheckoutModal errorInCheckout={errorInHadleCheckout} />
          <SuccessCheckoutModal checkoutSummary={checkoutSummary} />

          <Loader isLoading={isLoading} />
        </div>
      )}
    </>
  );
}
