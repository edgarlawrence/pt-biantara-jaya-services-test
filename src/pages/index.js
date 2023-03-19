import Head from "next/head";
import Image from "next/image";
import Layout from "./components/Layout";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "./components/Card";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [like, setLike] = useState(new Array(4).fill(false));
  const [dislike, setDislike] = useState(new Array(4).fill(false));
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const router = useRouter();

  const detailsHandler = (id) => {
    router.push({
      pathname: "/[id]",
      query: { id: id },
    });
  };

  const pageCount = 3;

  const getPeople = async (pageNumber) => {
    const res = await axios.get(
      `https://reqres.in/api/users?page=${pageNumber}&per_page=4`
    );
    return res.data;
  };

  const usePaginatedData = (pageNumber) => {
    return useQuery(["data", pageNumber], () => getPeople(pageNumber), {
      onSuccess: (data) => {
        setFilteredData(data.data);
      },
    });
  };

  const { data, error, isLoading } = usePaginatedData(currentPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage >= 3) {
      setCurrentPage(3);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage < 0) {
      setCurrentPage(0);
    }
  };

  // Error and Loading states
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleLikeChange = (event) => {
    const tokens = localStorage.getItem("token");
    if (tokens === null) {
      router.push("/login");
    }

    const index = parseInt(event.target.id);
    const newCheckedItems = [...like];
    newCheckedItems[index] = event.target.checked;
    setLike(newCheckedItems);

    if (dislike[index] === true) {
      const newCheckedItems2 = [...dislike];
      newCheckedItems[index] = event.target.checked;
      newCheckedItems2[index] = !event.target.checked;
      setLike(newCheckedItems);
      setDislike(newCheckedItems2);
    }
  };

  const handleDislikeCheckboxChange = (event) => {
    const tokens = localStorage.getItem("token");
    if (tokens === null) {
      router.push("/login");
    }

    const index = parseInt(event.target.id);
    const newCheckedItems = [...dislike];
    newCheckedItems[index] = event.target.checked;
    setDislike(newCheckedItems);

    if (like[index] === true) {
      const newCheckedItems2 = [...like];
      newCheckedItems[index] = !event.target.checked;
      newCheckedItems2[index] = event.target.checked;
      setDislike(newCheckedItems2);
      setLike(newCheckedItems);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const filtered = data.data.filter((item) =>
        item.first_name.toLowerCase().includes(search)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="Home" content="This is an Home Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="main-content px-10 py-0 2xl:py-12">
          <div className="title py-5">
            <h1 className="text-center font-bold text-3xl md:text-5xl">
              {" "}
              Meet Our People
            </h1>
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="border border-black text-gray-900 text-sm block w-full h-14 rounded-full search-input"
              placeholder="Find Your Favourite Person..."
              value={search}
              onChange={searchHandler}
              onKeyDown={handleKeyDown}
            />
            <div className="relative bottom-10 float-right right-4">
              <Image src="/search.svg" alt="search" width={25} height={25} />
            </div>
          </div>
          <div className="card-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-6 md:m-10">
            {filteredData.map((item, index) => (
              <div key={index} className="flex justify-center">
                <Card
                  cardClick={`/${item.id}`}
                  idPerson={index}
                  avatars={item.avatar}
                  cardName={item.first_name}
                  likeCheck={like[index]}
                  handleLikeChange={handleLikeChange}
                  dislikeCheck={dislike[index]}
                  handleDislikeChange={handleDislikeCheckboxChange}
                />
              </div>
            ))}
          </div>

          <div className="pagination flex justify-center py-5">
            <div className="flex justify-center items-center">
              <button
                className="border h-10 w-10 p-2 bg-login-img"
                onClick={handlePrevPage}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 fill-white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    id={currentNumber}
                    className={`mx-1 px-2 py-1 rounded ${
                      pageNumber === activePage
                        ? "border h-10 w-10 p-2 bg-login-img text-black"
                        : "border h-10 w-10 p-2 bg-login-img text-white"
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                className="border h-10 w-10 p-2 bg-login-img"
                onClick={handleNextPage}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 fill-white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
