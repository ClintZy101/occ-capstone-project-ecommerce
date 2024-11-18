const Input = ({ label, type, placeholder, value, onChange, name }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-md  focus:outline-none focus:ring focus:border-customBrown ring-customBrown-light "
        />
      </div>
    );
  };
  
  export default Input;
  