import React from "react";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/40 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-2xl font-bold">SSM Shop</div>
          <p className="muted mt-2">Premium social media engagement — secure, fast, and discreet.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Need Guidance?</h4>
          <p className="muted">Visit our socials<a className="hover:text-yellow-400"></a></p>
          <p className="muted mt-2">We are just a text away<a className="hover:text-yellow-400"></a></p>

          <div className="flex gap-3 mt-4 text-xl">
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaFacebook /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Contact</h4>
          <p className="muted">Phone: <a href="tel:+917055961246" className="hover:text-yellow-400">+91 705 596 1246</a></p>
          <p className="muted mt-2">For Email: <a href="mailto:info@ssmshop.com" className="hover:text-yellow-400">Click here</a></p>
          <p className="muted mt-2">© {new Date().getFullYear()} SSM Shop</p>
        </div>
      </div>
    </footer>
  );
}
