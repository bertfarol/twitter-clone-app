import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";


interface MenuProps{
  onClick: () => void;
}

export default function Menu({ onClick }: MenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openConfirmation, setOpenConfimation] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
   
    if (openConfirmation) {
      document.body.classList.add("modal-overlay");
    } else {
      document.body.classList.remove("modal-overlay");
    }

    let handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const toggleConfirmationBox = () => {
    setOpenConfimation(!openConfirmation);
    setOpenMenu(false);
  };

  const handleDelete = () => {
    onClick();
    setOpenConfimation(!openConfirmation);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="px-1 py-1 duration-300 rounded-full hover:hover:bg-zinc-100"
      >
        <DotsHorizontalIcon className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Menu Box */}
      {openMenu && (
        <div className="absolute drop-shadow-lg bg-white px-3.5 py-2 right-[30px] top-[5px] rounded-lg	hover:bg-zinc-100 cursor-pointer">
          <div onClick={toggleConfirmationBox} className="flex items-center">
            <TrashIcon className="w-5 h-5" />
            <div className="ml-2 font-bold select-none whitespace-nowrap">
              Delete
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {openConfirmation && (
        <div className="fixed z-50 p-8 bg-white shadow-lg w-80 left-2/4 top-[20%] translate-x-[-50%] rounded-2xl">
          <div className="mb-1 text-lg font-bold">Delete Tweet?</div>
          <p className="mb-5">
            This can&apos;t be undone and it will be remove from your profile,
            the timeline of any accounts that follow you, and from Twitter
            search results.
          </p>
          <div
            onClick={handleDelete}
            className="p-2 mb-3 text-center duration-300 bg-red-600 border border-red-600 rounded-full cursor-pointer hover:border-red-600/80 hover:bg-red-600/80"
          >
            <span className="font-bold text-white">Delete</span>
          </div>
          <div
            onClick={toggleConfirmationBox}
            className="p-2 text-center duration-300 bg-white border rounded-full cursor-pointer border-slate-300 hover:bg-slate-300/30"
          >
            <span className="font-bold">Cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}
