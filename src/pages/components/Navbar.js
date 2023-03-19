import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logOutHandler = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const dropdownHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const item = localStorage.getItem("token");
    setItem(item);
  }, []);

  return (
    <nav className="bg-login-img text-white font-bold flex flex-row text-center sm:flex-row sm:text-left justify-between items-center py-4 px-10 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a
          href="/home"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          Find People
        </a>
      </div>
      <div>
        {item === null ? (
          <a
            onClick={() => router.push("/login")}
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 cursor-pointer"
          >
            Login
          </a>
        ) : (
          <button onClick={dropdownHandler}>
            <Image src="/user.svg" alt="user" width={35} height={35} />
          </button>
        )}
        {open && (
          <div className="absolute grid grid-cols-1 divide-y bg-white text-black font-normal w-40 h-20 right-16 top-10">
            <button> Settings </button>
            <button onClick={logOutHandler}> Logout </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
