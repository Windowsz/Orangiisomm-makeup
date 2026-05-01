'use client'

import { useState, FormEvent } from 'react'

export default function CredentialsEditor() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaved(false)

    if (!currentPassword) {
      setError('Current password is required.')
      return
    }
    if (!newUsername && !newPassword) {
      setError('Enter a new username or new password.')
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    if (newPassword && newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/auth/credentials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim() || undefined,
          newPassword: newPassword || undefined,
        }),
      })
      const data = await res.json() as { error?: string }
      if (res.ok) {
        setSaved(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setSaved(false), 4000)
      } else {
        setError(data.error ?? 'Failed to update credentials.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold'

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-lg font-bold text-gray-800 mb-1">Admin Credentials</h2>
      <p className="text-xs text-gray-400 font-body mb-5">Change your login username or password. Current password is always required.</p>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {/* Current password — always required */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            autoComplete="current-password"
            className={inputCls}
          />
        </div>

        <div className="h-px bg-gray-100" />

        {/* New username */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">New Username <span className="normal-case font-normal text-gray-400">(leave blank to keep current)</span></label>
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            placeholder="New username"
            autoComplete="new-username"
            className={inputCls}
          />
        </div>

        {/* New password */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">New Password <span className="normal-case font-normal text-gray-400">(leave blank to keep current)</span></label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New password (min 8 chars)"
            autoComplete="new-password"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
            autoComplete="new-password"
            className={inputCls}
          />
        </div>

        {error && (
          <p className="text-brand-crimson text-sm bg-red-50 rounded-lg py-2 px-3">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-goldDark text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-brand-gold transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Update Credentials'}
          </button>
          {saved && <span className="text-green-600 text-sm font-body">Credentials updated ✓</span>}
        </div>
      </form>
    </div>
  )
}
