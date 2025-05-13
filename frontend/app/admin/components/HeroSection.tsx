
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-brand-purple to-violet-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Amazing Events Near You
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Join exciting events organized by our club branches across different locations.
              Register now for workshops, meetups, conferences, and more!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/events">
                <Button className="bg-white text-brand-purple hover:bg-gray-100">
                  Browse Events
                </Button>
              </Link>
              <Link to="/branches">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Branches
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item} 
                    className="aspect-square rounded-md overflow-hidden bg-gradient-to-br from-white/5 to-white/10"
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse h-full w-full bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                  <div>Upcoming Events</div>
                  <div className="font-bold text-xl">42</div>
                </div>
                <Link to="/events">
                  <Button size="sm" variant="link" className="text-white">
                    View all →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;
