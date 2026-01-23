import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminEbooksPage() {
  const ebooks = await prisma.ebook.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { orders: true },
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ebooks</h1>
        <Link
          href="/admin/ebooks/new"
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Add New Ebook
        </Link>
      </div>

      {ebooks.length === 0 ? (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-12 text-center">
          <p className="text-[var(--muted)] mb-4">No ebooks yet</p>
          <Link
            href="/admin/ebooks/new"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Add your first ebook
          </Link>
        </div>
      ) : (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Ebook
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Orders
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Created
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--muted)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {ebooks.map((ebook) => (
                <tr key={ebook.id} className="hover:bg-[var(--background)]">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 flex-shrink-0">
                        <Image
                          src={ebook.coverImage}
                          alt={ebook.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{ebook.title}</p>
                        <p className="text-sm text-[var(--muted)]">
                          {ebook.author}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[var(--accent)] font-medium">
                      ${(ebook.price / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[var(--muted)]">
                      {ebook._count.orders}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[var(--muted)] text-sm">
                      {new Date(ebook.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/ebooks/${ebook.id}`}
                      className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm"
                    >
                      Edit
                    </Link>
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
