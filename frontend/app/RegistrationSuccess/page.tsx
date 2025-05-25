// pages/403.tsx
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-black mb-4">Successfully Registered</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        You have been successfully registered for the Event. Please check you email for event pass. <br />
        Thank you, Eventify Team
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg shadow-md transition"
      >
        Go back home
      </Link>
    </div>
  )
}
