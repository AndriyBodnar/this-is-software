import Card from "@/components/Card/Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SavedUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let ff = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);

      if (key !== "ally-supports-cache") {
        let userData = JSON.parse(localStorage.getItem(key));
        ff.push(userData);
      }
    }

    setUsers([...ff]);
  }, []);

  return (
    <main className="container my-12 mx-auto px-12 md:px-12 overflow-x-hidden">
      <div className="fixed w-[60px] h-[60px] bottom-1/2 left-[-100px]">
        <button className="py-2.5 px-6 rounded-lg font-medium transition-all bg-[#DF2935]  uppercase text-[#E6E8E6]  text-base border  hover:bg-red-400 hover:text-white cursor-pointer transform origin-bottom-right fixed  p-0 text-center w-40 h-10  z-15  -rotate-90">
          <Link href="/">Main page</Link>
        </button>
      </div>

      <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
        {users.map((user, i) => (
          <Card user={user} key={i} disableBtn />
        ))}
      </div>
    </main>
  );
}
