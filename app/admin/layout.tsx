import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const isLoginPage =
    typeof window === 'undefined'
      ? false
      : window.location.pathname === '/admin/login';

  if (!session && !isLoginPage) {
    redirect('/admin/login');
  }

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      <AdminNav adminName={session.name} />
      <div className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
