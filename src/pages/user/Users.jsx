import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Users as UsersIcon } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/users/all",
          { withCredentials: true }
        );

        // ✅ FIX HERE
        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-10 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UsersIcon />
          Users Management
        </h1>

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-3 text-white/70" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 inline-block">
          <p className="text-sm text-white/70">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10">
        <table className="min-w-full text-left">
          <thead className="bg-white/20">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-white/10 hover:bg-white/10 transition"
                >
                  <td className="px-6 py-4 font-semibold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.isVerified ? (
                      <span className="text-green-400">Verified</span>
                    ) : (
                      <span className="text-red-400">Not Verified</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-white/70">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;