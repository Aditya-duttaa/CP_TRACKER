import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = (path) =>
    `block px-4 py-3 rounded-xl font-semibold transition ${
      location.pathname === path
        ? "bg-orange-500 text-black"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#151515] border-r border-white/10 p-6 hidden md:flex flex-col">
      <div>
        <h1 className="text-3xl font-black mb-10">
          CP <span className="text-orange-400">Tracker</span>
        </h1>

        <nav className="space-y-3">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/friends" className={linkClass("/friends")}>
            Friends
          </Link>

          <Link to="/analytics" className={linkClass("/analytics")}>
            Analytics
          </Link>
        </nav>
      </div>

      <button
        onClick={logout}
        className="w-full mt-8 py-3 rounded-xl bg-red-500/10 text-red-400 font-semibold hover:bg-red-500 hover:text-white transition"
        >
        Logout
        </button>
    </aside>
  );
}

export default Sidebar;