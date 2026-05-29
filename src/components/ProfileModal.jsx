import { useState, useEffect } from 'react';
import { getProfile } from '../api/profileApi';

export default function ProfileModal({ onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors border-0 bg-transparent cursor-pointer text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">My Profile</h2>

        {loading && (
          <p className="text-center text-gray-400 text-sm py-6">Loading profile...</p>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm py-6">{error}</p>
        )}

        {profile && (
          <div className="flex flex-col items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
              {profile.name?.charAt(0).toUpperCase() ?? 'A'}
            </div>

            {/* Info rows */}
            <div className="w-full flex flex-col gap-3">
              <ProfileRow label="Name" value={profile.name} />
              <ProfileRow label="Email" value={profile.email} />
              <ProfileRow label="Phone" value={profile.phone} />
              <ProfileRow label="Role" value={profile.role} capitalize />
              <ProfileRow
                label="Status"
                value={profile.status}
                capitalize
                valueClass={
                  profile.status === 'active'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-500 font-semibold'
                }
              />
              <ProfileRow
                label="Member Since"
                value={
                  profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileRow({ label, value, capitalize, valueClass }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
      <span className={`text-sm font-medium text-gray-800 ${capitalize ? 'capitalize' : ''} ${valueClass ?? ''}`}>
        {value ?? '—'}
      </span>
    </div>
  );
}
