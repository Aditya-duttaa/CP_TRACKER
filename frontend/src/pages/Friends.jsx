import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");

  const fetchFriends = async () => {
    const res = await api.get("/friends");
    setFriends(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await api.get("/friends/compare");
    setLeaderboard(res.data);
  };

  const addFriend = async (e) => {
    e.preventDefault();

    try {
      await api.post("/friends", { handle });
      setHandle("");
      setMessage("Friend added successfully");
      fetchFriends();
      fetchLeaderboard();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add friend");
    }
  };

  const removeFriend = async (friendHandle) => {
    await api.delete(`/friends/${friendHandle}`);
    fetchFriends();
    fetchLeaderboard();
  };

  const syncFriends = async () => {
    setMessage("Syncing friends...");
    await api.post("/friends/sync");
    setMessage("Friends synced successfully");
    fetchLeaderboard();
  };

  useEffect(() => {
    fetchFriends();
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-4xl font-black mb-2">
          Friends <span className="text-orange-400">Leaderboard</span>
        </h1>

        <p className="text-gray-400 mb-8">
          Add Codeforces friends and compare ratings.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Add Friend</h2>

            <form onSubmit={addFriend} className="space-y-4">
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Codeforces handle"
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 outline-none focus:border-orange-500"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black">
                Add Friend
              </button>
            </form>

            {message && (
              <p className="mt-4 text-sm text-orange-300 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                {message}
              </p>
            )}

            <button
              onClick={syncFriends}
              className="w-full mt-5 py-3 rounded-xl bg-white/5 text-gray-300 font-semibold hover:bg-white/10"
            >
              Sync Friends
            </button>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Friend List</h2>

            <div className="space-y-3">
              {friends.length === 0 ? (
                <p className="text-gray-400">No friends added yet.</p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend.handle}
                    className="flex items-center justify-between bg-black/40 rounded-xl px-4 py-3"
                  >
                    <span className="font-semibold">{friend.handle}</span>

                    <button
                      onClick={() => removeFriend(friend.handle)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1 bg-[#181818] border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Top Rank</h2>

            {leaderboard[0] ? (
              <div className="bg-gradient-to-br from-orange-500 to-yellow-400 text-black rounded-3xl p-6">
                <p className="font-bold">#{leaderboard[0].rankPosition}</p>
                <h3 className="text-3xl font-black mt-2">
                  {leaderboard[0].handle}
                </h3>
                <p className="text-5xl font-black mt-5">
                  {leaderboard[0].rating || "Unrated"}
                </p>
                <p className="font-semibold mt-2">Current Rating</p>
              </div>
            ) : (
              <p className="text-gray-400">No leaderboard data.</p>
            )}
          </div>

        </div>

        <div className="mt-6 bg-[#181818] border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-5">Leaderboard</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="py-3">Rank</th>
                  <th>Handle</th>
                  <th>Rating</th>
                  <th>Max Rating</th>
                  <th>CF Rank</th>
                  <th>Contests</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.handle} className="border-b border-white/5">
                    <td className="py-4 font-bold text-orange-400">
                      #{user.rankPosition}
                    </td>
                    <td className="font-semibold">{user.handle}</td>
                    <td>{user.rating || "Unrated"}</td>
                    <td>{user.maxRating || "Unrated"}</td>
                    <td className="capitalize">{user.rank || "Unrated"}</td>
                    <td>{user.totalContests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Friends;