import { prisma } from '@/lib/prisma';

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
          <input
            type="email"
            name="email"
            placeholder="Filter by email..."
            defaultValue={emailFilter || ''}
            className="flex-1 max-w-md px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Filter
          </button>
          {emailFilter && (
            <a
              href="/admin/orders"
              className="border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--foreground)] font-bold py-2 px-4 rounded transition-colors"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-12 text-center">
          <p className="text-[var(--muted)]">
            {emailFilter ? 'No orders found for this email' : 'No orders yet'}
          </p>
        </div>
      ) : (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Order
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Ebook
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--background)]">
                  <td className="p-4">
                    <span className="font-mono text-sm text-[var(--muted)]">
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
                    <span className="text-[var(--accent)] font-medium">
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
                    <span className="text-[var(--muted)] text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
