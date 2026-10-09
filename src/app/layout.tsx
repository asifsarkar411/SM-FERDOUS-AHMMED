import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Pritom Chowdhury | SQA Engineer & Full-Stack Developer',
  description: 'Professional portfolio of Pritom Chowdhury - Software Quality Assurance Engineer (Selenium, Playwright, Postman) and Full-Stack Developer (React, Next.js, Node.js, MongoDB) based in Mirpur, Dhaka, Bangladesh.',
  keywords: [
    'Pritom Chowdhury',
    'SQA Engineer',
    'Software Quality Assurance',
    'Full-Stack Developer',
    'Next.js Portfolio',
    'React Developer',
    'Playwright Automation',
    'Selenium WebDriver',
    'MongoDB',
    'Dhaka Bangladesh Developer',
  ],
  authors: [{ name: 'Pritom Chowdhury' }],
  creator: 'Pritom Chowdhury',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pritomchowdhury.dev',
    title: 'Pritom Chowdhury | SQA Engineer & Full-Stack Developer',
    description: 'Portfolio of Pritom Chowdhury. Active for Hire / Open to New Projects. Explore automated testing frameworks, full-stack projects, and engineering achievements.',
    siteName: 'Pritom Chowdhury Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080c14] text-slate-100 min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
