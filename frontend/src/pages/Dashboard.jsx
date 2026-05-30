import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [ratingGraph, setRatingGraph] = useState([]);
  const [error, setError] = useState("");
  const [tagStats, setTagStats] = useState([]);

  const fetchTagStats = async () => {
    try {
      const res = await api.get("/codeforces/me/tag-stats");

      const data = Object.entries(res.data)
        .map(([tag, count]) => ({ tag, count }))
        .slice(0, 10);

      setTagStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDashboard = async () => {
  try {
    const cached = localStorage.getItem("dashboard");

    if (cached) {
      setDashboard(JSON.parse(cached));
    }

    const res = await api.get("/codeforces/me/dashboard");

    setDashboard(res.data);

    localStorage.setItem(
      "dashboard",
      JSON.stringify(res.data)
    );

  } catch (err) {
    setError(err.response?.data?.message || "Failed to load dashboard");
  }
};

  const fetchRatingGraph = async () => {
    try {
      const res = await api.get("/codeforces/me/rating-graph");
      setRatingGraph(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchRatingGraph();
    fetchTagStats();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#111] text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-2">
            Welcome, <span className="text-orange-400">{dashboard.handle}</span>
          </h1>

          <p className="text-gray-400 mb-8">
            Your competitive programming overview
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Current Rating</p>
              <h2 className="text-4xl font-black text-orange-400 mt-3">
                {dashboard.rating || "Unrated"}
              </h2>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Max Rating</p>
              <h2 className="text-4xl font-black text-yellow-400 mt-3">
                {dashboard.maxRating || "Unrated"}
              </h2>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Rank</p>
              <h2 className="text-3xl font-black text-orange-300 mt-3 capitalize">
                {dashboard.rank || "Unrated"}
              </h2>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Max Rank</p>
              <h2 className="text-3xl font-black text-yellow-300 mt-3 capitalize">
                {dashboard.maxRank || "Unrated"}
              </h2>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Solved Problems</p>
              <h2 className="text-4xl font-black text-orange-400 mt-3">
                {dashboard.totalSolved}
              </h2>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">Total Contests</p>
              <h2 className="text-4xl font-black text-yellow-400 mt-3">
                {dashboard.totalContests}
              </h2>
            </div>
          </div>

          <div className="mt-6 bg-[#181818] border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              Rating <span className="text-orange-400">Graph</span>
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart   cursor={{ fill: "transparent" }}
  contentStyle={{
    backgroundColor: "#181818",
    border: "1px solid #333",
    borderRadius: "12px",
    color: "#fff",
  }} data={ratingGraph}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="contestName" hide />
                  <YAxis />
                  <Tooltip   cursor={{ fill: "transparent" }}
  contentStyle={{
    backgroundColor: "#181818",
    border: "1px solid #333",
    borderRadius: "12px",
    color: "#fff",
  }} />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#fb923c"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;