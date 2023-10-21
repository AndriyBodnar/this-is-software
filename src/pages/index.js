import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card/Card";
import { useFetching } from "@/hooks/useFetching";
import { useObserver } from "@/hooks/useObserver";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import UserService from "@/API/UserService";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState(12);
  const [count, setCount] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [localStorageLength, setLocalStorageLength] = useState(0);
  const lastElement = useRef();

  const [fetchUsers, isUsersLoading, userError] = useFetching(
    async (result) => {
      const response = await UserService.getUsers(result);

      setUsers([...users, ...response.data.results]);
    }
  );

  useObserver(lastElement, isUsersLoading, () => {
    setCount(count + 1);
  });
  useEffect(() => {
    setTimeout(() => setShowLoader(true), 1700);

    setLocalStorageLength(localStorage.length);
  }, []);

  useEffect(() => {
    fetchUsers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <main
      className={`container my-12 mx-auto px-12 md:px-12 overflow-x-hidden`}
    >
      {showLoader ? (
        <>
          {" "}
          {localStorageLength > 0 && (
            <div className="fixed w-[60px] h-[60px] bottom-1/2 left-[-100px]">
              <button className="py-2.5 px-6 rounded-lg font-medium transition-all bg-[#DF2935]  uppercase text-[#E6E8E6]  text-base border  hover:bg-red-400 hover:text-white cursor-pointer transform origin-bottom-right fixed  p-0 text-center w-40 h-10  z-15  -rotate-90">
                <Link href="/saved_users">Saved users</Link>
              </button>
            </div>
          )}
          <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
            {users.map((user, i) => (
              <Card
                user={user}
                key={i}
                localStorageFunc={setLocalStorageLength}
              />
            ))}
          </div>
          {isUsersLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <div>Loading</div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
      <div ref={lastElement} className="h-[20px] bg-[#E6E8E6]" />
    </main>
  );
}
