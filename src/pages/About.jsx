import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        About Us
      </h1>

      <p className="max-w-3xl text-center text-lg md:text-xl mb-8">
        Welcome to <span className="font-semibold">Your Company Name</span>, where innovation meets quality. We are dedicated to delivering exceptional services and creating solutions that make a real difference. Our team of passionate professionals works tirelessly to bring your ideas to life.
      </p>

      <div className="max-w-4xl grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            To provide top-notch solutions that empower individuals and businesses to achieve their goals efficiently and creatively.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>
            To become a trusted leader in technology and innovation, constantly pushing the boundaries of what’s possible.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside">
            <li>Integrity and Transparency</li>
            <li>Innovation and Creativity</li>
            <li>Customer Satisfaction</li>
            <li>Collaboration and Teamwork</li>
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p>
            Our team consists of experienced professionals who are passionate about technology, design, and creating solutions that make an impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
