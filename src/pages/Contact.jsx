import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f]
        text-white
        flex flex-col items-center
        px-4 py-20
      "
    >
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 blur-[160px]" />

      {/* Header */}
      <h1 className="relative text-4xl md:text-5xl font-extrabold mb-6 text-center">
        Contact Us
      </h1>

      <p className="relative max-w-3xl text-center text-lg md:text-xl mb-14 text-gray-400">
        Have a question or want to work with us? Fill out the form below and we
        will get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="
          relative w-full max-w-2xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-8 md:p-10
          flex flex-col gap-6
        "
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="
            w-full p-4 rounded-xl
            bg-black/40
            border border-white/10
            text-white placeholder-gray-400
            focus:outline-none
            focus:border-pink-400
            focus:ring-2 focus:ring-pink-400/40
            transition
          "
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="
            w-full p-4 rounded-xl
            bg-black/40
            border border-white/10
            text-white placeholder-gray-400
            focus:outline-none
            focus:border-pink-400
            focus:ring-2 focus:ring-pink-400/40
            transition
          "
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="6"
          required
          className="
            w-full p-4 rounded-xl
            bg-black/40
            border border-white/10
            text-white placeholder-gray-400
            focus:outline-none
            focus:border-pink-400
            focus:ring-2 focus:ring-pink-400/40
            transition resize-none
          "
        ></textarea>

        <button
          type="submit"
          className="
            mt-2 w-full py-3 rounded-xl
            bg-pink-400 text-[#141428]
            font-semibold
            hover:bg-pink-300
            hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
            transition
          "
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="relative mt-14 text-center space-y-4 text-gray-400">
        <p>
          Email:{" "}
          <span className="text-white font-medium">
            info@yourcompany.com
          </span>
        </p>
        <p>
          Phone:{" "}
          <span className="text-white font-medium">
            +91 123 456 7890
          </span>
        </p>
        <p>
          Address:{" "}
          <span className="text-white font-medium">
            123 Main Street, Your City, India
          </span>
        </p>
      </div>
    </div>
  );
};

export default Contact;
