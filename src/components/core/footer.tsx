import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-6 bg-primary text-background" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src={"/image/logo.webp"}
            height={240}
            width={240}
            alt="The Screaming Parrots Cafe footer logo"
            className="size-24"
          />
        </div>

        {/* Links */}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm font-medium justify-center md:justify-end">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="hover:underline">
            Cookies Policy
          </Link>
          <Link href="/help" className="hover:underline">
            Help & Support
          </Link>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-background/50 mt-6 pt-6 text-center text-xs sm:text-sm md:text-base font-semibold">
        © 2025 The Screaming Parrots Cafe: Desserts + Tea + Bites. All Rights
        Reserved.
      </div>
    </footer>
  );
}
