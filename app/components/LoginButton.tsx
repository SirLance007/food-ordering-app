'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Welcome, {session.user?.name}!</p>
        <img 
          src={session.user?.image || ''} 
          alt="Profile" 
          className="w-8 h-8 rounded-full"
        />
        <button 
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  )
}