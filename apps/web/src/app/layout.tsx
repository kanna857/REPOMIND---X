'use client';

import React, { useState } from 'react';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { CommandPalette } from '../components/layout/CommandPalette';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <head>
        <title>RepoMind-X — Your AI Copilot for Open Source</title>
        <meta
          name="description"
          content="Discover the right issue. Understand the code. Build with confidence. Ship your contribution. Powered by NVIDIA Nemotron via Nebius Token Factory."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#05070D] text-[#dfe2f1] min-h-screen selection:bg-[#00f0ff] selection:text-[#00363a] relative overflow-x-hidden">
        {/* Subtle coordinate dot grid background */}
        <div className="fixed inset-0 pointer-events-none cyber-grid opacity-30 z-0"></div>

        {/* Global Navbar */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Global Sidebar (Telemetry rails) */}
        <Sidebar />

        {/* Main Content Viewport */}
        <div className="lg:pl-64 min-h-screen flex flex-col relative z-10 pt-16">
          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>

        {/* Global Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
      </body>
    </html>
  );
}
