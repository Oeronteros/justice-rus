import { cookies } from 'next/headers';
import { connection } from 'next/server';
import PortalShell from '@/components/shell/PortalShell';
import { resolveSessionFromTokenStateless } from '@/lib/server/auth-session';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  await connection();

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const session = resolveSessionFromTokenStateless(token);

  return <PortalShell initialUser={session.valid ? session.user : null}>{children}</PortalShell>;
}
