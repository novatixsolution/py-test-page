'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    class_grade: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Use environment variable for API URL, fallback to localhost
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

    try {
      const response = await fetch(`${apiUrl}/api/admissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Student admission created successfully!' });
        // Reset form
        setFormData({
          full_name: '',
          father_name: '',
          class_grade: '',
        });
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to create admission' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please ensure the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            School Management System
          </h1>
          <p className="text-gray-600">Student Admission Form</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name
              </label>
              <input
                type="text"
                id="full_name"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Enter student's full name"
              />
            </div>

            <div>
              <label htmlFor="father_name" className="block text-sm font-medium text-gray-700 mb-2">
                Father Name
              </label>
              <input
                type="text"
                id="father_name"
                required
                value={formData.father_name}
                onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Enter father's name"
              />
            </div>

            <div>
              <label htmlFor="class_grade" className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <input
                type="text"
                id="class_grade"
                required
                value={formData.class_grade}
                onChange={(e) => setFormData({ ...formData, class_grade: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 5th Grade, Class 10"
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Admission'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>PoC - Testing Connection Speed & Architecture</p>
        </div>
      </div>
    </div>
  );
}
