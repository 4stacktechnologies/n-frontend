import { uploadToCloudinary } from "./user/CreateProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Edit2, Save, X, Loader2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

/* =========================
   SKELETON
========================= */
const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white border border-gray-200 p-8 shadow-sm animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-8" />
        <div className="flex gap-6 items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-48 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded" />
          ))}
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

/* =========================
   MAIN PROFILE
========================= */
const Profile = () => {
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    bio: "",
    avatarUrl: "",
    avatarPublicId: "",
  });

  const [preview, setPreview] = useState("");

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile: user.mobile || "",
        bio: user.bio || "",
        avatarUrl: user.avatar?.url || "",
        avatarPublicId: user.avatar?.publicId || "",
      });
      setPreview(user.avatar?.url || "");
    }
  }, [user]);

  if (!user) return <ProfileSkeleton />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    if (!editMode) return;
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const uploaded = await uploadToCloudinary(file);
    setForm((p) => ({
      ...p,
      avatarUrl: uploaded.url,
      avatarPublicId: uploaded.id,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await axios.put(
      `${import.meta.env.VITE_API_AUTH_URL}/edit-profile`,
      form,
      { withCredentials: true }
    );
    setUser(res.data.user);
    setEditMode(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setPreview(user.avatar?.url || "");
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-sm p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile
          </h1>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
            >
              <Edit2 size={16} />
              Edit
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                <X size={18} />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Save size={16} />
                )}
                Save
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-8 mb-10">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                className="w-28 h-28 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-indigo-600 text-white text-xl font-semibold">
                {getInitials(form.name)}
              </div>
            )}

            {editMode && (
              <label className="absolute bottom-1 right-1 bg-white border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
                <Camera size={16} />
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {user.email}
            </h2>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              {user.role}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Full Name" name="name" value={form.name} onChange={handleChange} disabled={!editMode} />
          <Field label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} disabled={!editMode} />
          <Field label="Email" value={user.email} disabled />
          <Field label="Role" value={user.role} disabled />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editMode}
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================
   FIELD
========================= */
const Field = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      {...props}
      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:bg-gray-100"
    />
  </div>
);

export default Profile;
