import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        <Button asChild>
          <Link href="/admin/ebooks/new">Add New Ebook</Link>
        </Button>
      </div>

      {ebooks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No ebooks yet</p>
            <Link
              href="/admin/ebooks/new"
              className="text-primary hover:text-primary/80"
            >
              Add your first ebook
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Ebook
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Orders
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Created
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ebooks.map((ebook) => (
                <tr key={ebook.id} className="hover:bg-background">
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
                        <p className="text-sm text-muted-foreground">
                          {ebook.author}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-primary font-medium">
                      ${(ebook.price / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground">
                      {ebook._count.orders}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground text-sm">
                      {new Date(ebook.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/ebooks/${ebook.id}`}
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      Edit
                    </Link>
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
