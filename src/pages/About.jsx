import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 text-gray-800">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-6">
          About Us
        </h1>

        {/* Intro */}
        <p className="max-w-3xl mx-auto text-center text-base md:text-xl text-gray-600 leading-relaxed mb-10 md:mb-16">
          Welcome to all, where innovation meets quality. We are dedicated to
          delivering exceptional services and creating solutions that make a
          real difference. Our team of passionate professionals works tirelessly
          to bring your ideas to life.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

          {/* Mission */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
              Our Mission
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              To provide top-notch solutions that empower individuals and
              businesses to achieve their goals efficiently and creatively.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
              Our Vision
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              To become a trusted leader in technology and innovation,
              constantly pushing the boundaries of what’s possible.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600 space-y-2">
              <li>Integrity and Transparency</li>
              <li>Innovation and Creativity</li>
              <li>Customer Satisfaction</li>
              <li>Collaboration and Teamwork</li>
            </ul>
          </div>

          {/* Team */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
              Our Team
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our team consists of experienced professionals who are passionate
              about technology, design, and creating solutions that make an
              impact.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
