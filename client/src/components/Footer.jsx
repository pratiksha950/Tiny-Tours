import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="text-orange-500">TripSpotter</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Discover breathtaking destinations, unforgettable experiences, and
            hassle-free travel with TinyTours. Your journey starts here.
          </p>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Popular Destinations
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Goa</li>
            <li className="hover:text-orange-400 cursor-pointer">Manali</li>
            <li className="hover:text-orange-400 cursor-pointer">Kashmir</li>
            <li className="hover:text-orange-400 cursor-pointer">Kerala</li>
            <li className="hover:text-orange-400 cursor-pointer">Rajasthan</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">Tours</li>
            <li className="hover:text-orange-400 cursor-pointer">About Us</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
            <li className="hover:text-orange-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-400" />
              Pune, Maharashtra, India
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-orange-400" />
              support@tinytours.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-orange-400" />
              +91 98765 43210
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <Facebook className="hover:text-orange-400 cursor-pointer" />
            <Instagram className="hover:text-orange-400 cursor-pointer" />
            <Twitter className="hover:text-orange-400 cursor-pointer" />
            <Youtube className="hover:text-orange-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TinyTours. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
