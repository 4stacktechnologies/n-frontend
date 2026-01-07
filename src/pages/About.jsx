import React from "react";

const About = () => {
  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f]
        text-white flex flex-col items-center
        px-4 py-20
      "
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 blur-[160px]" />

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-wide">
        About Us
      </h1>

      {/* Intro */}
      <p className="max-w-3xl text-center text-lg md:text-xl mb-12 text-gray-300">
        Welcome to{" "}
        <span className="font-semibold text-pink-400">
          Your Company Name
        </span>
        , where innovation meets quality. We are dedicated to delivering
        exceptional services and creating solutions that make a real
        difference. Our team of passionate professionals works tirelessly
        to bring your ideas to life.
      </p>

      {/* Content Grid */}
      <div className="max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Mission */}
        <div
          className="
            bg-white/5 backdrop-blur-xl
            rounded-3xl p-8
            border border-white/10
            transition-all duration-300
            hover:scale-[1.03]
            hover:border-pink-400/50
            hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
          "
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed">
            To provide top-notch solutions that empower individuals and
            businesses to achieve their goals efficiently and creatively.
          </p>
        </div>

        {/* Vision */}
        <div
          className="
            bg-white/5 backdrop-blur-xl
            rounded-3xl p-8
            border border-white/10
            transition-all duration-300
            hover:scale-[1.03]
            hover:border-pink-400/50
            hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
          "
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Our Vision
          </h2>
          <p className="text-gray-400 leading-relaxed">
            To become a trusted leader in technology and innovation,
            constantly pushing the boundaries of what’s possible.
          </p>
        </div>

        {/* Values */}
        <div
          className="
            bg-white/5 backdrop-blur-xl
            rounded-3xl p-8
            border border-white/10
            transition-all duration-300
            hover:scale-[1.03]
            hover:border-pink-400/50
            hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
          "
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Integrity and Transparency</li>
            <li>Innovation and Creativity</li>
            <li>Customer Satisfaction</li>
            <li>Collaboration and Teamwork</li>
          </ul>
        </div>

        {/* Team */}
        <div
          className="
            bg-white/5 backdrop-blur-xl
            rounded-3xl p-8
            border border-white/10
            transition-all duration-300
            hover:scale-[1.03]
            hover:border-pink-400/50
            hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
          "
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Our Team
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Our team consists of experienced professionals who are
            passionate about technology, design, and creating solutions
            that make an impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
