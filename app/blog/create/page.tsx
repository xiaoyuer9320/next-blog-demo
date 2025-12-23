import { createPost } from '../../actions'; // 引入后端逻辑
import Link from 'next/link'; 

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">发布新文章</h1>

        {/* action={createPost}: 提交表单时直接调用后端函数 */}
        <form action={createPost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            {/* required: 必填项，不填不准提交 */}
            <input name="title" type="text" required className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="请输入标题" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <input name="category" type="text" required className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="例如：React" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">内容 (支持 Markdown)</label>
            <textarea name="content" required rows={6} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="# 标题\n内容..." />
          </div>

          <div className="flex gap-4 pt-4">
            {/* 发布按钮 */}
            <button 
              type="submit" 
              className="w-2/3 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
            >
              🚀 立即发布
            </button>

            {/* 取消按钮：本质上就是一个跳回首页的链接 */}
            <Link href="/" className="w-1/3">
              <button 
                type="button" // ⚠️ 注意：这里一定要写 type="button"，否则它会触发表单提交
                className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-300 transition"
              >
                取消
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}