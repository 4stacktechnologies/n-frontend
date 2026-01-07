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
          `${import.meta.env.VITE_API_ADMIN_URL}/users/all`,
          { withCredentials: true }
        );

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
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading users...
      </div>
    );
  }

  return (
    <div
      className="
        relative min-h-screen px-6 py-10
        bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f]
        text-white overflow-hidden
      "
    >
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 blur-[160px]" />

      {/* Header */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-3">
          <UsersIcon className="text-pink-400" />
          Users Management
        </h1>

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2
              rounded-xl
              bg-black/40 backdrop-blur
              border border-white/10
              text-white placeholder-gray-400
              focus:outline-none
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/40
              transition
            "
          />
        </div>
      </div>

      {/* Stats */}
      <div className="relative mb-6">
        <div
          className="
            inline-block
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl px-6 py-4
          "
        >
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-pink-400">
            {totalUsers}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="
          relative overflow-x-auto
          bg-white/5 backdrop-blur-xl
          rounded-2xl
          border border-white/10
        "
      >
        <table className="min-w-full text-left text-sm">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-4 text-gray-400 font-medium">Name</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Email</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Role</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Verified</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="
                    border-t border-white/5
                    hover:bg-pink-500/5
                    transition
                  "
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-300">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    {user.isVerified ? (
                      <span className="text-green-400 font-medium">
                        Verified
                      </span>
                    ) : (
                      <span className="text-red-400 font-medium">
                        Not Verified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
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
