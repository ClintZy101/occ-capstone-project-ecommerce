import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function ReviewModal({
  isOpen,
  handleClose,
  productForReview,
  handleSubmit,
}) {
  const [content, setContent] = useState("");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-[500px] h-[400px] rounded-md shadow-lg relative p-10">
            <h2 className="text-lg font-semibold mb-4 text-center text-customBrown-dark">
              Write A Review
            </h2>

            <div>
              {/* <p>Product Name: {reviewData.product_name}</p> */}
              <EditableDiv
                productName={productForReview.product_name}
                content={content}
                setContent={setContent}
              />
              {/* <div contenteditable="true" className="border h-[200px] p-2">
                What can you say about our product: <strong>{reviewData.product_name}?...</strong>
              </div> */}
              
            </div>
            <button
              onClick={() => handleSubmit(content)}
              className="px-5 bg-customBrown text-white py-2 w-full mt-10 hover:bg-customBrown-dark duration-300 hover:font-bold rounded"
            >
              Submit Review
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const EditableDiv = ({ productName, setContent, content }) => {
  // To track the content
  const [isFocused, setIsFocused] = useState(false); // To handle placeholder visibility

  const handleInput = (e) => {
    setContent(e.target.innerText);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Hide placeholder only when there is content
    if (!content.trim()) {
      setIsFocused(false);
    }
  };

  return (
    <div
      contentEditable
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      suppressContentEditableWarning
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        minHeight: "200px",
        color: content.trim() ? "black" : "#aaa",
      }}
    >
      {!isFocused && !content.trim()
        ? `Write something about our product: ${productName}`
        : null}
    </div>
  );
};
