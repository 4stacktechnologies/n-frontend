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
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f] flex justify-center p-6">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-white/10 rounded" />
          <div className="h-4 w-16 bg-white/10 rounded" />
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="w-28 h-28 rounded-full bg-white/10" />
          <div className="h-4 w-40 bg-white/10 rounded mt-4" />
          <div className="h-3 w-20 bg-white/10 rounded mt-2" />
        </div>

        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-white/10 rounded mb-2" />
              <div className="h-10 w-full bg-white/10 rounded" />
            </div>
          ))}
          <div>
            <div className="h-3 w-16 bg-white/10 rounded mb-2" />
            <div className="h-20 w-full bg-white/10 rounded" />
          </div>
        </div>

        <div className="mt-6 h-10 w-full bg-white/10 rounded" />
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

  /* =========================
     INITIALS
  ========================= */
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].substring(0, 3).toUpperCase();
    return (
      parts[0].substring(0, 2) +
      parts[parts.length - 1].substring(0, 1)
    ).toUpperCase();
  };

  /* =========================
     LOAD USER
  ========================= */
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

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    if (!editMode) return;
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const uploaded = await uploadToCloudinary(file);
      setForm((prev) => ({
        ...prev,
        avatarUrl: uploaded.url,
        avatarPublicId: uploaded.id,
      }));
    } catch {
      console.error("Avatar upload failed");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_AUTH_URL}/edit-profile`,
        form,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPreview(user.avatar?.url || "");
    setForm({
      name: user.name || "",
      mobile: user.mobile || "",
      bio: user.bio || "",
      avatarUrl: user.avatar?.url || "",
      avatarPublicId: user.avatar?.publicId || "",
    });
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f] flex justify-center p-6 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 blur-[160px]" />

      <div className="relative w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl p-6 text-white border border-white/10 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-wide">My Profile</h2>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition"
            >
              <Edit2 size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={18} />
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="
                  flex items-center gap-2
                  bg-pink-400 text-[#141428]
                  hover:bg-pink-300
                  px-4 py-1.5 rounded-xl
                  font-semibold
                  hover:shadow-[0_0_18px_rgba(236,72,153,0.6)]
                  disabled:opacity-50
                  transition
                "
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* AVATAR */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              />
            ) : (
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500 text-xl font-bold text-[#141428] shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                {getInitials(form.name)}
              </div>
            )}

            {editMode && (
              <label className="absolute bottom-1 right-1 bg-black/60 backdrop-blur p-2 rounded-full cursor-pointer hover:bg-pink-400 hover:text-[#141428] transition">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <h3 className="text-lg font-semibold mt-3 text-white">
            {user.email}
          </h3>
          <span className="mt-1 px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300">
            {user.role}
          </span>
        </div>

        {/* FORM */}
        <div className="mt-6 space-y-4">
          <Field label="Full Name" name="name" value={form.name} onChange={handleChange} disabled={!editMode} />
          <Field label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} disabled={!editMode} />
          <Field label="Email" value={user.email} disabled />
          <Field label="Role" value={user.role} disabled />

          <div>
            <label className="text-sm text-gray-300">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editMode}
              rows={3}
              className="
                mt-1 w-full rounded-lg
                bg-black/40 border border-white/10
                p-2 text-white
                focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40
                disabled:opacity-50
                transition
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   FIELD
========================= */
const Field = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-300">{label}</label>
    <input
      {...props}
      className="
        mt-1 w-full rounded-lg
        bg-black/40 border border-white/10
        p-2 text-white
        focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40
        disabled:opacity-50
        transition
      "
    />
  </div>
);

export default Profile;
