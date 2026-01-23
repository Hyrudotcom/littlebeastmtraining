'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EbookFormProps {
  ebook?: {
    id: string;
    title: string;
    author: string;
    description: string;
    tableOfContents: string;
    testimonial: string | null;
    price: number;
    coverImage: string;
    fileUrl: string;
    slug: string;
  };
}

export default function EbookForm({ ebook }: EbookFormProps) {
  const router = useRouter();
  const isEditing = !!ebook;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(ebook?.title || '');
  const [author, setAuthor] = useState(ebook?.author || 'Little Beast M');
  const [description, setDescription] = useState(ebook?.description || '');
  const [tableOfContents, setTableOfContents] = useState(
    ebook?.tableOfContents || ''
  );
  const [testimonial, setTestimonial] = useState(ebook?.testimonial || '');
  const [price, setPrice] = useState(
    ebook ? (ebook.price / 100).toFixed(2) : ''
  );
  const [slug, setSlug] = useState(ebook?.slug || '');
  const [coverImage, setCoverImage] = useState(ebook?.coverImage || '');
  const [fileUrl, setFileUrl] = useState(ebook?.fileUrl || '');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isEditing
        ? `/api/admin/ebooks/${ebook.id}`
        : '/api/admin/ebooks';

      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          description,
          tableOfContents,
          testimonial: testimonial || null,
          price: Math.round(parseFloat(price) * 100),
          slug,
          coverImage,
          fileUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save ebook');
      }

      router.push('/admin/ebooks');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this ebook? This cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/ebooks/${ebook!.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete ebook');
      }

      router.push('/admin/ebooks');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD) *</Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="slug">URL Slug *</Label>
          <Input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="tableOfContents">Table of Contents *</Label>
          <Textarea
            id="tableOfContents"
            value={tableOfContents}
            onChange={(e) => setTableOfContents(e.target.value)}
            required
            rows={8}
            className="resize-none font-mono text-sm"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="testimonial">Testimonial (optional)</Label>
          <Input
            type="text"
            id="testimonial"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            placeholder="Customer quote for social proof"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="coverImage">Cover Image URL *</Label>
          <Input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
            placeholder="/images/cover.jpg or https://..."
          />
          {coverImage && (
            <div className="mt-4 relative w-32 h-40">
              <Image
                src={coverImage}
                alt="Cover preview"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="fileUrl">PDF File URL *</Label>
          <Input
            type="text"
            id="fileUrl"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
            placeholder="Vercel Blob URL or placeholder://filename.pdf"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Use placeholder://filename.pdf for testing, or upload to Vercel Blob for production
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/20 border border-destructive/50 text-destructive px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading} size="lg">
          {loading ? 'Saving...' : isEditing ? 'Update Ebook' : 'Create Ebook'}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            disabled={loading}
            className="text-destructive hover:text-destructive"
          >
            Delete Ebook
          </Button>
        )}
      </div>
    </form>
  );
}
