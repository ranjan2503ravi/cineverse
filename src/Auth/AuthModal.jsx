import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#1f1f1f] p-6 rounded-xl w-[350px] relative shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          ✕
        </button>

        {/* Toggle */}
        {isLogin ? (
          <Login switchMode={() => setIsLogin(false)} />
        ) : (
          <Signup switchMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;