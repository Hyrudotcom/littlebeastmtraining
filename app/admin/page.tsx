import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [ebookCount, orderCount, totalRevenue, recentOrders] = await Promise.all([
    prisma.ebook.count(),
    prisma.order.count({ where: { status: 'completed' } }),
    prisma.order.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    }),
    prisma.order.findMany({
      where: { status: 'completed' },
      include: { ebook: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const stats = [
    { label: 'Total Ebooks', value: ebookCount, href: '/admin/ebooks' },
    { label: 'Total Orders', value: orderCount, href: '/admin/orders' },
    {
      label: 'Total Revenue',
      value: `$${((totalRevenue._sum.amount || 0) / 100).toFixed(2)}`,
      href: '/admin/orders',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors"
          >
            <p className="text-[var(--muted)] text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
        <div className="p-6 border-b border-[var(--card-border)] flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm"
          >
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-6 text-center text-[var(--muted)]">
            No orders yet
          </div>
        ) : (
          <div className="divide-y divide-[var(--card-border)]">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.ebook.title}</p>
                  <p className="text-sm text-[var(--muted)]">{order.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[var(--accent)]">
                    ${(order.amount / 100).toFixed(2)}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
