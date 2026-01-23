'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      setShowForm(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      fetchAdmins();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Are you sure you want to remove this admin?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete admin');
      }

      fetchAdmins();
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete admin');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Admin'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
          <form onSubmit={handleCreateAdmin} className="space-y-4 max-w-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {formError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {formLoading ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-[var(--muted)]">Loading...</div>
      ) : (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--muted)]">
                  Email
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
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[var(--background)]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                        {admin.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{admin.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[var(--muted)]">{admin.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[var(--muted)] text-sm">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {admins.length > 1 && (
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-400 hover:text-red-300 text-sm transition-colors"
                      >
                        Remove
                      </button>
                    )}
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
