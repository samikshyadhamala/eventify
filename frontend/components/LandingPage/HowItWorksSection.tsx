'use client';
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-muted/50 px-12">
      <div className="container text-black flex items-center flex-col md:flex-row gap-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Follow these easy steps to join amazing events
          </p>
        </div>

        <div>
          {[1, 2, 3].map((num, index) => (
            <motion.div
              key={num}
              className="flex gap-4 items-center mb-6"
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ amount: 1, once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-primary-foreground text-xl font-bold mb-4">
                {num}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {['Browse Events', 'Register Easily', 'Enjoy the Event'][index]}
                </h3>
                <p className="text-muted-foreground">
                  {
                    [
                      'Explore our curated selection of events across various categories and locations',
                      'Quick and secure registration process with multiple payment options',
                      'Attend your event with digital tickets and connect with other attendees',
                    ][index]
                  }
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
