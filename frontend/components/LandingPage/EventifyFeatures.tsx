import { Zap, Shield, Calendar, Headphones } from 'lucide-react';

export default function EventifyFeatures() {
      const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Easy Registration",
      description: "Simple, fast registration process that takes less than 2 minutes",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Bank-level security for all transactions and personal data",
    },
    // {
    //   icon: <Calendar className="h-8 w-8" />,
    //   title: "Smart Scheduling",
    //   description: "Intelligent calendar integration and reminder notifications",
    // },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
    },
  ]
    return (
        <>
            <section id="features" className="py-16 px-12">
                <div className="container ">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Eventify?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We provide everything you need for successful event management and attendance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 text-black rounded-full bg-primary/10 text-primary mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}