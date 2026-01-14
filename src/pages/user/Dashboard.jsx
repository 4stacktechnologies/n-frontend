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
        const dashRes = await axios.get(
          `${import.meta.env.VITE_API_ADMIN_URL}/dashboard`,
          { withCredentials: true }
        );

        const userRes = await axios.get(
          `${import.meta.env.VITE_API_ADMIN_URL}/users/all`,
          { withCredentials: true }
        );

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
    return (
      <p className="text-center mt-10 text-gray-500 font-medium">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
    );

  const { summary, charts } = dashboard;

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-800 overflow-hidden">
      {/* Optional subtle ambient blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gray-200/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-gray-200/10 rounded-full blur-[140px]" />

      {/* HEADER */}
      <h1 className="relative text-3xl font-bold tracking-wide mb-8">
        Admin Dashboard
      </h1>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
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
          data={filteredUsers.map((u) => [u.name, u.email, u.role])}
        />
      </Section>

      {/* ================= PRODUCTS BY CATEGORY ================= */}
      <Section title="Products By Category">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.productsByCategory.map((item) => (
            <div
              key={item._id}
              className="
                bg-white/50 backdrop-blur-sm
                border border-gray-200
                rounded-2xl p-6 text-center
                hover:bg-gray-100/50
                hover:shadow-md
                transition
              "
            >
              <p className="text-gray-500 text-sm">Category</p>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                {item._id}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-3">
                {item.count}
              </p>
              <p className="text-gray-400 text-sm mt-1">Products</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md mb-10">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="
      bg-white
      border border-gray-300
      rounded-lg px-4 py-2
      text-gray-800 placeholder-gray-500
      focus:outline-none
      focus:border-gray-800
      focus:ring-2 focus:ring-gray-300
      transition
    "
  />
);

const Select = (props) => (
  <select
    {...props}
    className="
      bg-white
      border border-gray-300
      rounded-lg px-4 py-2
      text-gray-800
      focus:outline-none
      focus:border-gray-800
      focus:ring-2 focus:ring-gray-300
      transition
    "
  />
);

const Table = ({ headers, data }) => (
  <div className="overflow-x-auto bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm">
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-2 text-left text-gray-500 font-medium"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-4 text-gray-400">
              No users found
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 hover:bg-gray-100/50 transition"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-800">
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
