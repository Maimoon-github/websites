import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#bbbbbb] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-display font-extrabold text-7xl text-[#e22718] uppercase tracking-tight">404</h1>
      <h2 className="font-display font-bold text-2xl text-white uppercase mt-2 mb-4">Page Not Found</h2>
      <p className="text-sm text-[#9a9a9a] max-w-md mb-6 leading-relaxed">
        The requested page or section could not be located.
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-11 px-6 bg-[#c8200f] hover:bg-[#e22718] text-white text-xs font-bold tracking-widest uppercase transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
