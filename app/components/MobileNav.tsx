'use client';

import { useState } from 'react';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '#book-call', label: 'Book a Call' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    return (
        <nav className="md:hidden w-full bg-gray-900 text-white shadow fixed top-0 left-0 z-40">
            <div className="flex items-center justify-between px-4 py-3">
                <a href="#home" className="text-lg font-bold">Caprise Brock</a>
                <button
                    className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white mb-1 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>
            {isOpen && (
                <ul className="flex flex-col space-y-2 px-4 pb-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="block py-2 px-2 rounded hover:bg-gray-800 hover:text-blue-500 transition font-bold"
                                onClick={handleClick}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
} 