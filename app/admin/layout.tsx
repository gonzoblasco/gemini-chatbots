import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/app/actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  // Allow access to login page without session
  // Note: This layout wraps /admin, so we need to handle the case where we are already on /admin/login
  // But layout applies to children. 
  // Wait, if I put this layout in /app/admin/layout.tsx, it applies to /app/admin/login too.
  // So I need to check if the current path is login? Layouts don't know the path easily.
  // Better approach: Move login to /app/login or handle check inside page.
  // Or: Check if session exists. If NOT, and we are NOT in login, redirect.
  // But layout runs for everything.
  
  // Actually, standard pattern: Middleware or per-page check.
  // Since I don't want to add middleware file now, I'll let the layout check.
  // But if I am on /admin/login, I shouldn't redirect to /admin/login (loop).
  
  // Let's assume /admin/login is OUTSIDE this layout? No, it's inside /admin.
  // I will move login to /app/login-admin to avoid this, OR just handle it in the page.
  
  // Alternative: The layout renders a Sidebar/Header for Admin.
  // If not logged in, it renders the Login form? No, that's messy.
  
  // I'll use a Group Route: (admin) and (auth).
  // But for now, I'll just put the check in the Dashboard Page `app/admin/page.tsx` and `app/admin/new/page.tsx`.
  // And `app/admin/layout.tsx` will just be a wrapper for the authenticated UI.
  // AND I'll move `app/admin/login` to `app/login` to separate it.
  // Or I'll keep `app/admin/login` and make `app/admin/layout.tsx` only render the admin sidebar if logged in?
  
  // Let's do this:
  // `app/admin/layout.tsx` will check cookie. If no cookie, it redirects to `/admin/login`.
  // BUT `/admin/login` needs to NOT use this layout.
  // So I should use Route Groups: `app/admin/(protected)/layout.tsx` and `app/admin/(public)/login/page.tsx`.
  
  // I'll create `app/admin/(protected)/layout.tsx` and move dashboard there.
  // And `app/admin/login/page.tsx` will stay as is (using root layout).
  
  // Wait, that's too much refactoring of folders.
  // Simplest: `app/admin/page.tsx` checks cookie. `app/admin/new/page.tsx` checks cookie.
  // `app/admin/layout.tsx` provides the Admin Header (Logout button).
  // If I am on Login page, I don't want the Admin Header.
  
  // Okay, I will move Login to `/app/admin-login/page.tsx` to completely separate it.
  // And `/app/admin` will be fully protected by `app/admin/layout.tsx`.
  
  if (!session) {
    // If we are here, we are in /admin/...
    // We can't easily know if we are in /admin/login from server layout without headers hack.
    // So I will move login page to /app/admin-login/page.tsx
    redirect('/admin-login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black/20 border-b border-white/10 p-4 flex justify-between items-center">
        <Link href="/admin" className="text-xl font-bold text-white">Admin Panel</Link>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-400 hover:text-white">Ver Catálogo</Link>
          <form action={logout}>
            <button className="text-red-400 hover:text-red-300">Salir</button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
