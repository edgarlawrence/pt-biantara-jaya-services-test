import React from "react";
import Layout from "./components/Layout";
import axios from "axios";

function Details({ data }) {
  return (
    <Layout>
      <div className="flex flex-col justify-center py-14 md:py-20 lg:py-20 text-center">
        <div className="details-title">
          <h1 className="text-2xl font-bold py-5"> Details Page </h1>
        </div>

        <div className="bg-login-img px-10 md:px-20 lg:px-40 py-20 md:w-1/2 mx-auto rounded-xl text-white font-bold">
          <div className="id-person py-2">
            <p> Id: {data.id} </p>
          </div>
          <div className="title py-2">
            <p> Name: {data.name} </p>
          </div>
          <div className="year py-2">
            <p> Year: {data.year} </p>
          </div>
          <div className="favourite-color py-2">
            <p> Favourite Color: {data.color}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const query = context.query;
  const { id } = query;

  const res = await axios.get(`https://reqres.in/api/unknown/${id}`);
  const data = res.data.data;

  return {
    props: { data },
  };
}
