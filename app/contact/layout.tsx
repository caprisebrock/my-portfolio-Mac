import React from 'react';

interface ContactLayoutProps {
  children: React.ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <>
      {children}
    </>
  );
} 