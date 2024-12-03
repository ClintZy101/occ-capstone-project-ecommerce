import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import ContactSupportResponseModal from "../modals/ContactSupportResponseModal";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseModalIsOpen, setResponseModalIsOpen] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        "service_d99rvg3",
        "template_cozhypi",
        formData,
        "WT8jlS1mcHd2DtyVJ" // Provided by EmailJS
      )
      .then(
        (result) => {
          setResponseMessage("Email sent successfully!", result.text);
          
        },
        (error) => {
          setResponseMessage(
            "Failed to send email. Please try again.",
            error.text
          );
        }
      )
      .finally(() => setLoading(false));

      setResponseModalIsOpen((prevState)=> !prevState)
  };

  return (
    <div className="w-screen min-h-[500px]">
      <form 
  onSubmit={handleSubmit} 
  className="border rounded-lg shadow-lg p-8 bg-white lg:w-[700px] mx-auto my-10 grid gap-6">
  <h2 className="text-2xl font-bold text-center text-gray-700">Contact Us</h2>
  
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    required
    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-customBrown focus:outline-none text-gray-700 placeholder-gray-400"
  />
  
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    required
    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-customBrown focus:outline-none text-gray-700 placeholder-gray-400"
  />
  
  <textarea
    name="message"
    placeholder="Your Message"
    value={formData.message}
    onChange={handleChange}
    required
    className="p-4 border rounded-md focus:ring-2 focus:ring-customBrown focus:outline-none text-gray-700 placeholder-gray-400 h-32 resize-none"
  />
  
  <button 
    type="submit" 
    disabled={loading}
    className={`w-full py-3 rounded-lg text-white font-semibold ${
      loading ? "bg-gray-400 cursor-not-allowed" : "bg-customBrown hover:bg-customBrown-dark"
    }`}
  >
    {loading ? "Sending..." : "Send Message"}
  </button>

  <div
  className={`${responseModalIsOpen ? 'grid': 'hidden'}`}
  >

  </div>

  
  
  {responseMessage && (
    <ContactSupportResponseModal
    isOpen={responseModalIsOpen}
    response={responseMessage}
    handleClose={()=>setResponseModalIsOpen((prevState) => prevState)}
    handleSubmit={handleNavigate}
   />
  )}
</form>

    </div>
  );
};

export default ContactSupport;
