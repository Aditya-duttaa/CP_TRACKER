import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/signup", {
        email,
        password,
        codeforcesHandle,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex overflow-hidden">
      <div className="hidden lg:flex w-1/2 relative p-14 flex-col justify-between bg-[#151515]">
        <div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
        <div className="absolute w-[350px] h-[350px] bg-yellow-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tight">
            CP <span className="text-orange-400">TRACKER</span>
          </h1>
          <p className="mt-5 text-gray-400 text-lg max-w-md">
            Create your account and start tracking your Codeforces progress.
          </p>
        </div>

        <div className="relative z-10 bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <p className="text-gray-400 mb-6">What you get</p>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-xl font-bold text-orange-400">Rating Analytics</h3>
              <p className="text-sm text-gray-400">Track your growth contest by contest.</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-xl font-bold text-yellow-400">Tag Insights</h3>
              <p className="text-sm text-gray-400">Understand what type of problems you solve.</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-xl font-bold text-orange-300">Friend Leaderboard</h3>
              <p className="text-sm text-gray-400">Compare ratings with your friends.</p>
            </div>
          </div>
        </div>
      </div>

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
            <h2 className="text-3xl font-bold mb-2">Create account</h2>

            <p className="text-gray-400 mb-8">
              Connect your Codeforces handle.
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="adi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Codeforces Handle
                </label>
                <input
                  type="text"
                  placeholder="tourist"
                  value={codeforcesHandle}
                  onChange={(e) => setCodeforcesHandle(e.target.value)}
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
                CREATE ACCOUNT
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;