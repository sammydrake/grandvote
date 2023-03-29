import React from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const socialMediaLinks = [
    {
      name: "github",
      link: "https://github.com/barrsam0101/grandvote-blockchain-system",
      icon: <FaGithub />,
    },
    {
      name: "twitter",
      link: "https://twitter.com/Grandvote",
      icon: <FaTwitter />,
    },
    {
      name: "linkedIn",
      link: "https://www.linkedin.com/Grandvote",
      icon: <FaLinkedin />,
    },
    {
      name: "telegram",
      link: "https://t.me/Grandvote",
      icon: <FaTelegramPlane />,
    },
    {
      name: "whatsapp",
      link: "https://wa.me/1234567890",
      icon: <FaWhatsapp />,
    },
    {
      name: "email",
      link: "mailto:gmail.com",
      icon: <FaEnvelope />,
    },
  ];

  return (
    <div className="bg-gray-800 py-8 px-4 text-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-2">Grandida LLC.</p>
          <p className="text-sm">
            Empowering the world with blockchain technology
          </p>
        </div>
        <div className="flex justify-center md:justify-end items-center mt-4 md:mt-0">
          {socialMediaLinks.map((media, idx) => (
            <div key={idx + 1} className="ml-4 md:ml-8">
              <Link href={{ pathname: `${media.link}` }}>{media.icon}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <p className="text-sm">© 2023 Grandida LLC. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
