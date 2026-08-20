export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  )
}
