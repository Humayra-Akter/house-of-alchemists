export default function AuthLayout({ title, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* animated gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-sky-950 to-amber-950 bg-[length:400%_400%] animate-gradient" />
      {/* blobs */}
      <div className="absolute -top-24 left-[-5rem] w-80 h-80 bg-primary/35 blur-3xl rounded-full animate-blob" />
      <div className="absolute top-1/3 right-[-6rem] w-96 h-96 bg-secondary/35 blur-3xl rounded-full animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-7rem] left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-red-950/50 blur-3xl rounded-full animate-blob animation-delay-4000" />
      <div className="absolute inset-0 -z-10 animate-hue" />

      {/* Card */}
      <div className="min-h-screen grid place-items-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/15 rounded-2xl shadow-xl p-6">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2">
              <span className="text-2xl">🧪</span>
              <h1 className="text-xl font-extrabold">House of Alchemists</h1>
            </div>
            <p className="text-sm text-white/80">{title}</p>
          </div>
          {children}
        </div>
        <p className="mt-6 text-xs text-white/70">
          © {new Date().getFullYear()} HoA
        </p>
      </div>
    </div>
  );
}
