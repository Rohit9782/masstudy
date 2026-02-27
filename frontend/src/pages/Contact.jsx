import React, { useState } from "react";
import { toast } from "react-toastify";


const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our English course? We would love to hear from you.
          Send us a message and our team will respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-6">
            If you have any questions about enrollment, pricing, or course
            details, feel free to contact us through the form or using the
            details below.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Location: Jaipur, Rajasthan, India</p>
            <p>📧 Email: support@masstudy.com</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>⏰ Working Hours: Mon - Sat (9:00 AM - 6:00 PM)</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;