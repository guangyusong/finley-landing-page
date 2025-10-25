"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-white text-slate-900">
      <div className="text-center">
        <p className="text-sm font-semibold text-orange-600">Something went wrong</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Unexpected error</h1>
        <p className="mt-4 text-slate-600">Please try again. If the problem persists, contact support.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold hover:shadow-lg hover:shadow-orange-600/25 transition-all"
          >
            Try again
          </button>
          <Link href="/" className="px-6 py-3 rounded-full border-2 border-slate-300 text-slate-700 font-semibold hover:border-orange-600 transition-all">
            Go home
          </Link>
        </div>
        {process.env.NODE_ENV !== 'production' && error?.digest && (
          <p className="mt-4 text-xs text-slate-400">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}

