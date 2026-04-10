import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';

const Dropdown = ({ title, options, func }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(title);

  return (
    <div className="relative  inline-block text-left z-[100]">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 bg-zinc-800/80 backdrop-blur-md text-white py-2 px-5 rounded-full border border-white/10 shadow-lg hover:bg-zinc-700 transition-all active:scale-95 text-xs md:text-sm font-bold min-w-[120px]"
      >
        {selected.toUpperCase()}
        <RiArrowDownSLine className={`text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 -left-1.5 mt-2 w-full min-w-[140px] bg-zinc-900 border border-white/5 rounded-2xl shadow-2xl overflow-hidden overflow-y-auto"
          >
            {options.map((o, i) => (
              <div
                key={i}
                onClick={() => {
                  func({ target: { value: o } }); // Dummy event for compatibility
                  setSelected(o);
                  setIsOpen(false);
                }}
                className="px-5 py-3 text-zinc-400 hover:text-white hover:bg-red-600 transition-all cursor-pointer text-xs md:text-sm font-bold border-b border-white/5 last:border-0"
              >
                {o.toUpperCase()}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default Dropdown;