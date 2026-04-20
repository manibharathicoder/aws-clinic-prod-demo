export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
        <p className="text-slate-400 text-lg">You don't have permission to access this page.</p>
      </div>
    </div>
  );
}
