import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#0f172a" }} className="text-white py-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                    <p className="text-xl">
                        © {new Date().getFullYear()} Sorting Visualizer. All rights reserved.
                    </p>
                    <p className="text-xl mt-1">
                        Contact :{" "}
                        <a
                            href="mailto:vedantsh06@gmail.com"
                            className="hover:underline text-indigo-400"
                        >
                            vedantsh06@gmail.com
                        </a>
                    </p>
                </div>
                <div className="flex space-x-6 md:mt-0">
                    <a
                        href="https://github.com/Ved-nt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-color duration-300"
                    >
                        <FaGithub size={30} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vedant-sharma-919a172a6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors duration-300"
                    >
                        <FaLinkedin size={30} />
                    </a>
                    <a
                        href="https://www.instagram.com/ve_dant05/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition-colors duration-300"
                    >
                        <FaInstagram size={30} />
                    </a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;