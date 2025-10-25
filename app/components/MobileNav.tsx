"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (ev.key === "Tab" && open && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (ev.shiftKey && active === first) {
          last.focus();
          ev.preventDefault();
        } else if (!ev.shiftKey && active === last) {
          first.focus();
          ev.preventDefault();
        }
      }
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      const first = menuRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="fixed top-0 md:top-6 left-0 md:left-1/2 md:-translate-x-1/2 right-0 md:right-auto z-50 px-4 md:px-8 py-4 md:py-4 backdrop-blur-xl bg-white/95 md:border border-slate-200/60 shadow-lg shadow-slate-900/5 md:rounded-full flex items-center justify-between gap-3 md:gap-8 w-full md:w-auto">
      <div className="relative h-6 md:h-7 w-auto">
        <Image src="/garrison-logo-dark.png" alt="Garrison Capital" width={120} height={28} className="h-full w-auto" priority />
      </div>
      <div className="hidden md:flex gap-8 text-sm text-slate-600 font-medium">
        <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
        <a href="#why-us" className="hover:text-slate-900 transition-colors">Why Us</a>
        <a href="#stories" className="hover:text-slate-900 transition-colors">Stories</a>
      </div>
      <a href="#contact" className="hidden md:block px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-orange-600/25 hover:scale-105 transition-all">
        Get Started
      </a>

      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          ref={menuRef}
          className="fixed top-16 left-4 right-4 z-40 md:hidden backdrop-blur-xl bg-white/95 border border-slate-200/60 shadow-lg rounded-3xl p-6"
        >
          <h2 id="mobile-menu-title" className="sr-only">Menu</h2>
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" onClick={() => setOpen(false)} className="text-slate-700 hover:text-orange-600 font-medium py-2 transition-colors">How It Works</a>
            <a href="#why-us" onClick={() => setOpen(false)} className="text-slate-700 hover:text-orange-600 font-medium py-2 transition-colors">Why Us</a>
            <a href="#stories" onClick={() => setOpen(false)} className="text-slate-700 hover:text-orange-600 font-medium py-2 transition-colors">Stories</a>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-600/25 transition-all text-center">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}

