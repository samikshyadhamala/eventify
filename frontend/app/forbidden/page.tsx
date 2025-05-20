// pages/403.tsx
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-black mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-700 mb-6">
        Sorry, you don’t have permission to access this page.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-black hover:bg-red-500 text-white rounded-lg shadow-md transition"
      >
        Go back home
      </Link>
    </div>
  )
}
