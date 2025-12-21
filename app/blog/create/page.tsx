// 引入 actions，注意相对路径：向上两级
import { createPost } from '../../actions'; 

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">发布新文章</h1>

        <form action={createPost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input name="title" type="text" required className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="请输入标题" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <input name="category" type="text" required className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="例如：React" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
            <textarea name="content" required rows={6} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="写下你的想法..." />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">
            🚀 立即发布
          </button>
        </form>
      </div>
    </div>
  );
}