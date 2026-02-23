import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example EmailJS
    // emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", formRef.current, "PUBLIC_KEY")

    setSuccess(true);
    formRef.current.reset();
  };

  return (
    <section className="min-h-screen bg-white text-black px-6 py-20 pt-40 flex items-center justify-center">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side Text */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Let’s Talk 👋
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Got a question about our products? Want custom orders?
            Or just want to say hi? We’d love to hear from you.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Karachi, Pakistan</p>
            <p>📧 support@nextfit.com</p>
            <p>📞 +92 300 1234567</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-gray-50 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send Us a Message ✨
          </h2>

          {success && (
            <p className="text-green-600 text-center mb-4 font-medium">
              🎉 Your message has been sent successfully!
            </p>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <textarea
              name="message"
              placeholder="Write your message..."
              required
              rows="5"
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;
