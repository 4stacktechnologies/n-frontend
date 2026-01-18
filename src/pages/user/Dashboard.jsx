import { useEffect, useState } from "react";
import axios from "axios";

const USERS_PER_PAGE = 10;

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [page, setPage] = useState(1);

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
    setPage(1);
  }, [userName, userRole, users]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  const { summary, charts } = dashboard;

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card title="Users" value={summary.totalUsers} />
        <Card title="Products" value={summary.totalProducts} />
        <Card title="Shops" value={summary.totalShops} />
      </div>

      {/* ================= PRODUCTS BY CATEGORY ================= */}
      <Section title="Products By Category">
        <div className="grid grid-cols-3 gap-3">
          {charts.productsByCategory.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl p-3 text-center"
            >
              <p className="text-xs text-gray-500">Category</p>
              <h3 className="text-sm font-semibold truncate">
                {item._id}
              </h3>
              <p className="text-lg font-bold mt-1">{item.count}</p>
              <p className="text-xs text-gray-400">Products</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= USERS ================= */}
      <Section title="Users">
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
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
          data={paginatedUsers.map((u) => [u.name, u.email, u.role])}
        />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </Section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-white border rounded-xl p-3 text-center">
    <p className="text-xs text-gray-500">{title}</p>
    <h2 className="text-lg font-bold">{value}</h2>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white border rounded-xl p-4 mb-6">
    <h2 className="font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
  />
);

const Select = (props) => (
  <select
    {...props}
    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
  />
);

const Table = ({ headers, data }) => (
  <div className="overflow-x-auto border rounded-lg">
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-3 py-2 text-left text-gray-600">
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
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2">
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
