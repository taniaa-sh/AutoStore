"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error(".Email is required");
      return;
    } else if (!password) {
      toast.error(".Password is required");
      return;
    } else if (!email.includes("@")) {
      toast.error(".Enter a valid email");
      return;
    } else if (password.length < 8) {
      toast.error(".Password must be at least 8 characters long");
      return;
    } else {
      // setLoading(true);
      // const result = await signIn("credentials", {
      //   redirect: false,
      //   email,
      //   password,
      //   remember: rememberMe,
      // })
      // if (result?.ok) {
      toast.success("Login successful!");
      router.replace("/");
      window.location.href = "/"
      // toast.error("Login failed.");
      setLoading(false);
      // }
    };
  }

  return (
    <main className="bg-gradient-to-br from-blue-300 via-white to-blue-50 p-6 min-h-screen">
      <div className="max-w-xl mx-auto  bg-white shadow-2xl rounded-3xl overflow-hidden mt-20 h-[640px] md:h-[620px] p-6">
        <h1 className="text-lg md:text-3xl font-bold mb-6 text-blue-700 text-center">Sign in to your account</h1>
        <h6 className="text-xs md:text-base text-gray-500 text-center -mt-3">Access All Pro Cars</h6>
        <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-xs md:text-lg font-medium text-gray-700 mb-2 px-3"
            >
              Email
            </label>
            <input
              autoFocus
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Type your email"

              className="w-full h-12 px-4 py-2 text-xs md:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label
              htmlFor="password"
              className="block text-xs md:text-lg font-medium text-gray-700 mb-2 px-3"
            >
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              maxLength={20}
              placeholder="Type your password"
              className="w-full h-12 px-4 py-2 pr-12 text-xs md:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {
              password !== "" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[50px] text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )
            }
          </div>

          <div className="text-right text-sm mt-2 flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-xs md:text-sm ml-1">Remember me</label>
            </div>
            <p
              className="text-blue-600 text-xs md:text-sm hover:underline cursor-pointer select-none"
              onClick={() => router.push("/forgotPass")}
            >
              Forgot Password?
            </p>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 text-sm md:text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : "Sign In"}
          </button>

          {/* Other Options */}
          <div className="mt-4 flex justify-evenly">
            <span className="h-0.5 w-16 md:w-40 bg-gray-200 mt-2" />
            <p className="text-xs md:text-sm text-gray-500 text-nowrap">Or continue with</p>
            <span className="h-0.5 w-16 md:w-40 bg-gray-200 mt-2" />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center mt-3">
            <button
              type="button"
              onClick={() => signIn("google")}
              className="border border-gray-300 rounded-lg px-12 md:px-16 py-3"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={"/google.png"}
                  alt="Google"
                  width={18}
                  height={20}
                />
                <p className="text-xs md:text-sm font-medium">Google</p>
              </div>
            </button>
            <button
              type="button"
              className="border border-gray-300 rounded-lg px-10 md:px-16 py-3"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={"/facebook.png"}
                  alt="Google"
                  width={22}
                  height={20}
                />
                <p className="text-xs md:text-sm font-medium">Facebook</p>
              </div>
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default Login;