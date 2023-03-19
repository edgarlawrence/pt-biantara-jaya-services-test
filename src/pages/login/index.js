import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Head from "next/head";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const postFormData = async () => {
    const response = await axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          router.push("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          setError(err.response.data.error);
        }
      });
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const { mutate } = useMutation(postFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    mutate({ email: email, password: password });
  };

  return (
    <div className="login-base">
      <Head>
        <title>Login</title>
        <meta name="Login" content="Login Before Enter this site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        <div
          className="hidden lg:bg-login-img lg:flex lg:justify-center lg:items-center"
          style={{ height: "100vh" }}
        >
          <div
            style={{
              backgroundImage: `url(/login-img.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "570px",
              width: "420px",
            }}
          ></div>
        </div>

        <div className="form-section">
          <div className="text-6xl text-center mt-20 2xl:mt-44 mb-10">
            <h1 className="font-bold"> Login </h1>
          </div>

          {error && (
            <div className="errors bg-red-500 text-center mx-10 py-8 rounded-lg">
              <p className="text-white font-bold text-lg"> {error} </p>
            </div>
          )}
          <form className="forms" onSubmit={handleSubmit}>
            <div className="py-14 px-10 form-control">
              <div className="form-control py-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-light text-black"
                >
                  Enter Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={emailChangeHandler}
                  className="border border-black text-gray-900 text-sm block w-full h-20 rounded-full"
                  required
                />
              </div>
              <div className="form-control">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-light text-black"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  className="border border-black text-gray-900 text-sm block w-full h-20 rounded-full"
                  required
                />
              </div>
              <div className="btns my-8">
                <button className="bg-login-img text-white font-bold text-md block w-full h-20 rounded-full drop-shadow-xl">
                  {" "}
                  {loading === true ? (
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white fill-green-600 relative left-2/4"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <p> Sign In</p>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
