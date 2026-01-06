import { uploadToCloudinary } from "./user/CreateProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Edit2, Save, X, Loader2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081b22] to-[#0f2b33] flex justify-center p-6">
      <div className="w-full max-w-xl bg-[#11232b]/90 rounded-2xl p-6 shadow-xl border border-white/10 animate-pulse">
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
     INITIALS LOGIC
  ========================= */
 const getInitials = (name) => {
  if (!name || typeof name !== "string") return "U";

  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "U";

  if (parts.length === 1) {
    return parts[0].substring(0, 3).toUpperCase();
  }

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
    } catch (err) {
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

      // ✅ IMPORTANT
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed");
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
    <div className="min-h-screen bg-gradient-to-br from-[#081b22] to-[#0f2b33] flex justify-center p-6">
      <div className="w-full max-w-xl bg-[#11232b]/90 rounded-2xl p-6 text-white shadow-xl border border-white/10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Profile</h2>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <Edit2 size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="text-gray-300 hover:text-white"
              >
                <X size={18} />
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg disabled:opacity-50"
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
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold">
                {getInitials(form.name)}
              </div>
            )}

            {editMode && (
              <label className="absolute bottom-1 right-1 bg-black/60 p-2 rounded-full cursor-pointer">
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

          <h3 className="text-lg font-semibold mt-3">{user.email}</h3>
          <p className="text-gray-400 text-sm">{user.role}</p>
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
              className="mt-1 w-full rounded-md bg-[#0c1f26] border border-white/10 p-2 disabled:opacity-50"
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
      className="mt-1 w-full rounded-md bg-[#0c1f26] border border-white/10 p-2 disabled:opacity-50"
    />
  </div>
);

export default Profile;
