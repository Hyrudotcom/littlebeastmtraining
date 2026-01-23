import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link
            href="/admin/orders"
            className="text-primary hover:text-primary/80 text-sm"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No orders yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.ebook.title}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">
                      ${(order.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
