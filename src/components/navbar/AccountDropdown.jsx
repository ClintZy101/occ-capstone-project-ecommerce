import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AccountDropdown({
  wrapperRef,
  accountDropdownIsActive,
  setAccountDropdownIsActive,
  user,
  signOut,
}) {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/account/${id}`);
        setAccountDropdownIsActive(!accountDropdownIsActive)
    }
  return (
    <AnimatePresence>
      {accountDropdownIsActive && (
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden={!accountDropdownIsActive}
          className="grid px-10 py-5 gap-5 absolute -bottom-[170px] right-0 rounded-lg bg-customBrown-darkest text-white min-w-[300px] "
        >
          <span className="border-b border-b-customBrown-light pb-2">
            <strong>Signed In as:</strong>
            <br />
            {user.email}
          </span>

            <p
            onClick={()=>handleNavigate(user.uid)}
              tabIndex="0"
              className="cursor-pointer border border-customBrown text-center py-2 hover:bg-customBrown rounded"
            >
              My Account
            </p>

          <span
            tabIndex="1"
            onClick={signOut}
            className="cursor-pointer bg-customBrown text-white px-5 py-1 rounded hover:rounded-full font-semibold transition-all text-center border border-customBrown-light"
          >
            Logout
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
