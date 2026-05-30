import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen bg-[#111111] text-white flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative p-14 flex-col justify-between bg-[#151515]">

        <div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
        <div className="absolute w-[350px] h-[350px] bg-yellow-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tight">
            CP <span className="text-orange-400">TRACKER</span>
          </h1>
          <p className="mt-5 text-gray-400 text-lg max-w-md">
            Track ratings, contests, solved problems and friend rankings in one place.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <p className="text-gray-400 mb-6">Rating Progress</p>

          <div className="flex items-end gap-4 h-56">
            <div className="w-10 h-20 bg-orange-500 rounded-t-xl"></div>
            <div className="w-10 h-28 bg-orange-400 rounded-t-xl"></div>
            <div className="w-10 h-24 bg-yellow-500 rounded-t-xl"></div>
            <div className="w-10 h-36 bg-orange-500 rounded-t-xl"></div>
            <div className="w-10 h-44 bg-yellow-400 rounded-t-xl"></div>
            <div className="w-10 h-52 bg-orange-400 rounded-t-xl"></div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-orange-400">1541</h3>
              <p className="text-sm text-gray-400">Rating</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-yellow-400">1659</h3>
              <p className="text-sm text-gray-400">Max</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-orange-300">100+</h3>
              <p className="text-sm text-gray-400">Contests</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 relative">

        <div className="absolute w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-3xl top-[-100px] right-[-100px] lg:hidden" />

        <div className="w-full max-w-md relative z-10">

          <div className="mb-10 lg:hidden text-center">
            <h1 className="text-5xl font-black">
              CP <span className="text-orange-400">TRACKER</span>
            </h1>
            <p className="text-gray-400 mt-3">
              Your competitive programming dashboard
            </p>
          </div>

          <div className="bg-[#181818]/90 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-2">
              Welcome back
            </h2>

            <p className="text-gray-400 mb-8">
              Login to continue tracking your progress.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <label className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                onChange={(e) => setEmail(e.target.value)}
                  placeholder="adi@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-orange-500"
                />
              </div>
                {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                </p>
                )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black hover:scale-[1.02] transition"
              >
                LOGIN
              </button>

            </form>

            <p className="text-center text-gray-400 mt-6">
              New here?{" "}
              <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-semibold">
                Create account
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;