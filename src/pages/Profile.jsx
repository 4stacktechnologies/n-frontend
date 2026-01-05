import { useState } from "react";
import { useAuth } from "../auth/AuthContext"; // make sure this path is correct
import { Camera } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  if (!user) return <p className="text-white">Loading...</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBioSave = () => {
    setEditingBio(false);
    console.log("Bio saved:", bio);
    // TODO: call API to persist bio
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1c23] p-4">
      <div className="bg-[#11232b]/90 shadow-lg rounded-2xl p-6 w-full max-w-md text-white backdrop-blur-md border border-white/10">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/120?text=Profile"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
            />
            <label className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition">
              <Camera className="text-white w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name and Role */}
          <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-400">{user.role}</p>

          {/* User Info */}
          <div className="mt-4 w-full space-y-2 text-gray-300">
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Mobile:</strong> {user.mobile || "Not set"}</div>
            <div><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</div>
            <div><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
            <div><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}</div>
          </div>

          {/* Bio Section */}
          <div className="mt-4 w-full">
            <strong>Bio:</strong>
            {editingBio ? (
              <div className="flex flex-col mt-2">
                <textarea
                  className="border border-white/20 bg-[#11232b]/70 text-white p-2 rounded-md w-full placeholder-gray-400"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself..."
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    className="bg-gray-600 px-3 py-1 rounded-md hover:bg-gray-500"
                    onClick={() => setEditingBio(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500"
                    onClick={handleBioSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <p>{bio || "No bio added."}</p>
                <button
                  className="text-blue-400 underline text-sm hover:text-blue-300"
                  onClick={() => setEditingBio(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
