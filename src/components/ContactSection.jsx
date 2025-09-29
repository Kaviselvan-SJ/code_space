import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 py-10 text-center gap-5 bg-gradient-to-br">
      
      <h1 className="text-5xl font-extrabold drop-shadow-md">
        Contact Us
      </h1>

      <p className="max-w-xl text-md">
        Have questions about <span className="font-medium text-indigo-600 dark:text-indigo-400">Code Space</span>?  
        Reach out to us below, and we’ll get back to you soon!
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 space-y-6 mt-6"
      >
        <div className="text-left">
          <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="text-left">
          <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="text-left">
          <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Send Message
        </button>

        {submitted && (
          <p className="text-green-600 dark:text-green-400 font-medium mt-2">
            ✅ Your message has been sent!
          </p>
        )}
      </form>
    </div>
  );
};
