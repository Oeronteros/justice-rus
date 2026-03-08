import { cookies } from 'next/headers';
import PortalShell from '@/components/PortalShell';
import { resolveSessionFromToken } from '@/lib/server/auth-session';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const session = await resolveSessionFromToken(token);

  return <PortalShell initialUser={session.valid ? session.user : null}>{children}</PortalShell>;
}
