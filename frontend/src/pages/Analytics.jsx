import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [tagStats, setTagStats] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);

  const fetchTagStats = async () => {
    const cached = localStorage.getItem("tag-stats");

    if (cached) {
      setTagStats(JSON.parse(cached));
    }
    const res = await api.get("/codeforces/me/tag-stats");

    const data = Object.entries(res.data)
      .map(([tag, count]) => ({ tag, count }))
      .slice(0, 10);

    setTagStats(data);
    localStorage.setItem(
      "tag-stats",
      JSON.stringify(data)
    );
  };

  const fetchRatingDistribution = async () => {
        const cached = localStorage.getItem("ratingdistribution");

    if (cached) {
      setRatingDistribution(JSON.parse(cached));
    }

    const res = await api.get("/codeforces/me/rating-distribution");

    const data = Object.entries(res.data).map(([range, count]) => ({
      range,
      count,
    }));

    setRatingDistribution(data);
    localStorage.setItem(
      "ratingdistribution",
      JSON.stringify(data)
    );
  };

  useEffect(() => {
    fetchTagStats();
    fetchRatingDistribution();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-2">
            Problem <span className="text-orange-400">Analytics</span>
          </h1>

          <p className="text-gray-400 mb-8">
            Understand your solved problems by tags and difficulty.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">
                Rating <span className="text-orange-400">Distribution</span>
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid vertical={false} stroke="#222" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "#181818",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#fb923c"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">
                Top <span className="text-orange-400">Tags</span>
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tagStats}>
                    <CartesianGrid vertical={false} stroke="#222" />
                    <XAxis dataKey="tag" />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "#181818",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#facc15"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;