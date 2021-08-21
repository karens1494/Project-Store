import React from "react";
import socialFacebook from "../images/social-facebook.png";
import socialInstagram from "../images/social-instagram.png";

export default function Footer() {
  return (
    <footer className="block py-4 bg-black w-auto">
      <div className="container mx-auto">
        <hr className="mb-4 border-b-1 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 ">
            <div className="text-sm text-white font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://appland.tech/"
                className="text-white hover:text-gray-800 text-sm font-bold py-1"
              >
                Example
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
