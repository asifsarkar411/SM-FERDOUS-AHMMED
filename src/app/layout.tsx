import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { initialSeedData } from '@/lib/seedData';

export async function generateMetadata(): Promise<Metadata> {
  let avatarUrl = initialSeedData.profile.avatarUrl;
  let name = 'SM Ferdous Ahmmed';

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const profile = await Profile.findOne().lean();
      if (profile) {
        if (profile.avatarUrl) avatarUrl = profile.avatarUrl;
        if (profile.name) name = profile.name;
      }
    }
  } catch (err) {
    console.error('Error loading metadata in layout.tsx:', err);
  }

  return {
    title: `${name} | SQA Engineer & Full-Stack Developer`,
    description: `Professional portfolio of ${name} - Software Quality Assurance Engineer (Selenium, Playwright, Postman) and Full-Stack Developer (React, Next.js, Node.js, MongoDB) based in Mirpur, Dhaka, Bangladesh.`,
    keywords: [
      name,
      'SM Ferdous Ahmmed',
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
    authors: [{ name }],
    creator: name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://github.com/asifsarkar411/SM-FERDOUS-AHMMED',
      title: `${name} | SQA Engineer & Full-Stack Developer`,
      description: `Portfolio of ${name}. Active for Hire / Open to New Projects. Explore automated testing frameworks, full-stack projects, and engineering achievements.`,
      siteName: `${name} Portfolio`,
      images: [{ url: avatarUrl }],
    },
    icons: {
      icon: avatarUrl,
      shortcut: avatarUrl,
      apple: avatarUrl,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#f8fafc] text-slate-900 dark:bg-black dark:text-slate-100 min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-200">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
