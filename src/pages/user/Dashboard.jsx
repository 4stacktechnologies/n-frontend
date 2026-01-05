import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, userRes] = await Promise.all([
          axios.get("https://n-frontend.vercel.app/api/admin/dashboard", {
            withCredentials: true,
          }),
          axios.get("https://n-frontend.vercel.app/api/admin/users/all", {
            withCredentials: true,
          }),
        ]);

        setDashboard(dashRes.data);
        setUsers(userRes.data.users);
        setFilteredUsers(userRes.data.users);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= USER FILTER ================= */
  useEffect(() => {
    let result = users;

    if (userName) {
      result = result.filter((u) =>
        u.name.toLowerCase().includes(userName.toLowerCase())
      );
    }

    if (userRole) {
      result = result.filter((u) => u.role === userRole);
    }

    setFilteredUsers(result);
  }, [userName, userRole, users]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-400">{error}</p>;

  const { summary, charts } = dashboard;

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card title="Total Users" value={summary.totalUsers} />
        <Card title="Total Products" value={summary.totalProducts} />
        <Card title="Total Shops" value={summary.totalShops} />
      </div>

      {/* ================= USER SEARCH ================= */}
      <Section title="Search Users">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Search by name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="OWNER">OWNER</option>
            <option value="USER">USER</option>
          </Select>
        </div>

        <Table
          headers={["Name", "Email", "Role"]}
          data={filteredUsers.map((u) => [
            u.name,
            u.email,
            u.role,
          ])}
        />
      </Section>

      {/* ================= PRODUCTS BY CATEGORY ================= */}
      <Section title="Products By Category">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.productsByCategory.map((item) => (
            <div
              key={item._id}
              className="bg-[#020617] border border-white/10 rounded-xl p-6 text-center hover:bg-white/5 transition"
            >
              <p className="text-gray-400 text-sm">Category</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                {item._id}
              </h3>
              <p className="text-3xl font-bold text-indigo-400 mt-3">
                {item.count}
              </p>
              <p className="text-gray-500 text-sm mt-1">Products</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

/* ================= REUSABLE DARK COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-[#020617] border border-white/10 rounded-xl p-6 text-center shadow-lg">
    <p className="text-gray-400">{title}</p>
    <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-[#020617] border border-white/10 rounded-xl p-6 shadow-lg">
    <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="bg-[#020617] border border-white/10 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const Select = (props) => (
  <select
    {...props}
    className="bg-[#020617] border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const Table = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-white/10">
      <thead className="bg-[#020617]">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border border-white/10 px-4 py-2 text-left text-gray-300"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center py-4 text-gray-500"
            >
              No users found
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-white/10 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
