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
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Contact Us
      </h1>

      <p className="max-w-3xl text-center text-lg md:text-xl mb-12">
        Have a question or want to work with us? Fill out the form below and we will get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col gap-6"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="p-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="p-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="6"
          required
          className="p-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
        ></textarea>

        <button
          type="submit"
          className="bg-[#00bcd4] hover:bg-[#00a4c4] transition-colors font-semibold py-3 rounded-lg text-black"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-center space-y-4">
        <p>Email: <span className="font-semibold">info@yourcompany.com</span></p>
        <p>Phone: <span className="font-semibold">+91 123 456 7890</span></p>
        <p>Address: <span className="font-semibold">123 Main Street, Your City, India</span></p>
      </div>
    </div>
  );
};

export default Contact;
