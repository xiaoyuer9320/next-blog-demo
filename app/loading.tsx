export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 标题骨架 */}
      <div className="mb-8 text-center">
        <div className="h-10 w-64 bg-gray-300 rounded mx-auto animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mx-auto mt-2 animate-pulse"></div>
      </div>

      {/* 卡片骨架列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow h-48 animate-pulse">
            <div className="h-4 w-16 bg-blue-200 rounded mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}