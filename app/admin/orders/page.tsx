import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface OrdersPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const emailFilter = params.email;

  const orders = await prisma.order.findMany({
    where: emailFilter
      ? {
          email: {
            contains: emailFilter,
          },
        }
      : undefined,
    include: {
      ebook: true,
      downloads: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="mb-6">
        <form method="GET" className="flex gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Filter by email..."
            defaultValue={emailFilter || ''}
            className="flex-1 max-w-md"
          />
          <Button type="submit">Filter</Button>
          {emailFilter && (
            <Button asChild variant="outline">
              <Link href="/admin/orders">Clear</Link>
            </Button>
          )}
        </form>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              {emailFilter ? 'No orders found for this email' : 'No orders yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Order
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Ebook
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-background">
                  <td className="p-4">
                    <span className="font-mono text-sm text-muted-foreground">
                      {order.id.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{order.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{order.ebook.title}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-primary font-medium">
                      ${(order.amount / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : order.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
