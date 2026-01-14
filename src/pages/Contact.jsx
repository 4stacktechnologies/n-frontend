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
    <section className="bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Contact Us
        </h1>

        <p className="max-w-3xl mx-auto text-center text-lg md:text-xl text-gray-600 mb-16 leading-relaxed">
          Have a question or want to work with us? Fill out the form below and we
          will get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            required
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition resize-none"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold transition hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-16 text-center space-y-3 text-gray-600">
          <p>
            Email:{" "}
            <span className="text-gray-900 font-medium">
              info@yourcompany.com
            </span>
          </p>
          <p>
            Phone:{" "}
            <span className="text-gray-900 font-medium">
              +91 123 456 7890
            </span>
          </p>
          <p>
            Address:{" "}
            <span className="text-gray-900 font-medium">
              123 Main Street, Your City, India
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;
