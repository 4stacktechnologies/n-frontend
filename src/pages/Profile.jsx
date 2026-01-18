// components/Profile.jsx
import { uploadToCloudinary } from "./user/CreateProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Edit2, Save, X, Loader2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

/* =========================
   SKELETON LOADING
========================= */
const ProfileSkeleton = () => (
  <div className="flex justify-center px-4 py-10 bg-gray-50">
    <div className="w-full max-w-md bg-white rounded-2xl border p-6 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
      <div className="h-4 w-40 bg-gray-200 rounded mx-auto mb-2" />
      <div className="h-3 w-48 bg-gray-200 rounded mx-auto" />
    </div>
  </div>
);

/* =========================
   MAIN PROFILE COMPONENT
========================= */
const Profile = () => {
  const { user, login } = useAuth(); // login updates AuthContext globally
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

  /* =========================
     Initialize form from user
  ========================= */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile: user.mobile || user.profile?.mobile || "", // handle nested mobile
        bio: user.bio || "",
        avatarUrl: user.avatar?.url || "",
        avatarPublicId: user.avatar?.publicId || "",
      });
      setPreview(user.avatar?.url || "");
    }
  }, [user]);

  if (!user) return <ProfileSkeleton />;

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    if (!editMode) return;
    const file = e.target.files[0];
    if (!file) return;

    // Preview image
    setPreview(URL.createObjectURL(file));

    // Upload to Cloudinary
    const uploaded = await uploadToCloudinary(file);

    setForm((prev) => ({
      ...prev,
      avatarUrl: uploaded.url,
      avatarPublicId: uploaded.id,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Save profile to backend
      await axios.put(
        `${import.meta.env.VITE_API_AUTH_URL}/edit-profile`,
        form,
        { withCredentials: true }
      );

      // Refetch user from backend
      const res = await axios.get(`${import.meta.env.VITE_API_AUTH_URL}/me`, {
        withCredentials: true,
      });

      login(res.data); // update context globally with latest user

      setEditMode(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPreview(user.avatar?.url || "");
    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      mobile: user.mobile || user.profile?.mobile || "",
      bio: user.bio || "",
      avatarUrl: user.avatar?.url || "",
      avatarPublicId: user.avatar?.publicId || "",
    }));
  };

  return (
    <section className="bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Profile</h1>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1 text-sm text-indigo-600"
            >
              <Edit2 size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button onClick={handleCancel}>
                <X size={18} className="text-gray-500" />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Save
              </button>
            </div>
          )}
        </div>

        {/* Avatar + Name + Email + Mobile */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            {preview ? (
              <img
                src={preview}
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
                {form.name?.[0] || "U"}
              </div>
            )}

            {editMode && (
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full border cursor-pointer">
                <Camera size={14} />
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Name */}
          <h2 className="text-base font-medium text-gray-900">{form.name || "-"}</h2>

          {/* Email */}
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>

          {/* Mobile */}
          <p className="text-sm text-gray-600 mt-2">📞 {form.mobile || "-"}</p>
        </div>

        {/* EDIT MODE FIELDS */}
        {editMode && (
          <div className="mt-6 space-y-4">
            <ProfileInput label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <ProfileInput label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================
   INPUT COMPONENT
========================= */
const ProfileInput = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input {...props} className="mt-1 w-full rounded-lg border p-3" />
  </div>
);

export default Profile;
