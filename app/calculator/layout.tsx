import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import PortalShell from '@/components/shell/PortalShell';
import { resolveSessionFromToken } from '@/lib/server/auth-session';

interface CalculatorLayoutProps {
  children: ReactNode;
}

export default async function CalculatorLayout({ children }: CalculatorLayoutProps) {
  await connection();
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const session = await resolveSessionFromToken(token);

  return (
    <PortalShell initialUser={session.valid ? session.user : null}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {children}
      </div>
    </PortalShell>
  );
}
