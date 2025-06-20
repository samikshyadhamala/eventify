'use client'
import React from 'react';
import { motion } from 'framer-motion';

export default function EventifyFeatures() {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }
  const features = [
    {
      image: "/images/landingPage/easyRegistration.png",
      title: "Easy Registration",
      description: "Our registration process is designed to be intuitive and efficient, allowing you to sign up for events in under two minutes. With a user-friendly interface, you can quickly enter your details, select your preferences, and get started without any hassle, making event participation a breeze.",
      testimonial: {
        avatar: "/images/john-doe.jpg",
        text: "The registration process was so smooth and quick. I was able to sign up for the event in no time!"
      }
    },
    {
      image: "/images/landingPage/securePayment.png",
      title: "Secure Payments",
      description: "We prioritize the security of your transactions with a robust payment system that employs bank-level encryption and advanced security protocols. This ensures that your personal and financial information remains protected at all times, giving you peace of mind while booking events.",
      testimonial: {
        avatar: "/images/jane-smith.jpg",
        text: "I felt completely safe making payments through the platform. The security measures are top-notch."
      }
    },
    {
      image: "/images/landingPage/247Service.png",
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions or issues you might encounter. Whether you need help with registration, payments, or accessing event details, we’re here to provide prompt and reliable assistance whenever you need it.",
      testimonial: {
        avatar: "/images/alice-johnson.jpg",
        text: "The support team was incredibly helpful and responsive, even late at night. They resolved my issue promptly."
      }
    },
  ];

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-1">
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Eventify?</h2>
        </div>
      </div>
      {features.map((feature, index) => (
        <div key={index} className={`py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <div className={`flex flex-col md:flex-row items-center justify-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <motion.div
                className="w-full md:w-1/2 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                >
                <motion.div
                  className="text-2xl font-semibold mb-4"
                  variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                  }}
                >
                  {feature.title}
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600 mb-4"
                  variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: 0.1, ease: "easeOut" }
                  }
                  }}
                >
                  {feature.description}
                </motion.p>
                </motion.div>

              <div className="w-80 flex justify-center items-center">
                <img src={feature.image} alt={feature.title} className="w-full rounded shadow border" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}