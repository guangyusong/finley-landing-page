import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-white text-slate-900">
      <div className="text-center">
        <p className="text-sm font-semibold text-orange-600">404</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you’re looking for doesn’t exist or was moved.</p>
        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold hover:shadow-lg hover:shadow-orange-600/25 transition-all">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

