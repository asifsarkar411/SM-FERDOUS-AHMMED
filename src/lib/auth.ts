import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from './mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@pritom.dev' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        const inputEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password;

        const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@ferdous.dev').toLowerCase().trim();
        const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: inputEmail });

          if (user) {
            const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
            if (!isPasswordValid) {
              throw new Error('Invalid email or password');
            }
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role || 'admin',
            };
          }
        } catch (dbError) {
          console.warn('DB check encountered error during auth, falling back to environment admin credentials:', dbError);
        }

        // Fallback to configured Admin credentials from environment variables
        if (inputEmail === defaultAdminEmail && inputPassword === defaultAdminPassword) {
          return {
            id: 'admin-env-user',
            name: 'SM Ferdous Ahmmed (Admin)',
            email: defaultAdminEmail,
            role: 'admin',
          };
        }

        throw new Error('Invalid email or password');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || 'admin';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as { role?: string; id?: string }).role = (token.role as string) || 'admin';
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'sm-ferdous-ahmmed-secure-jwt-auth-key-2026',
};

export default authOptions;
