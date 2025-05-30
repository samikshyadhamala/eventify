'use client'
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#100c0c] text-white border-t border-gray-800">
      <div className="container mx-auto px-4 pl-8 md:pl-12 py-10 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Eventify</h2>
            <p className="text-gray-400 max-w-xs">
              Creating memorable experiences through seamless event management solutions for Rotaract clubs.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="hover:text-gray-300 text-gray-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 text-gray-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 text-gray-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links - Only 3 links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white text-gray-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/allevent" className="hover:text-white text-gray-400 transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white text-gray-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>9842525351</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>eventify.services@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">© {currentYear} Eventify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
