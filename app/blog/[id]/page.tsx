import Link from 'next/link';
// 注意相对路径：向上3级
import { supabase } from '../../../lib/supabase'; 
import { deletePost } from '../../actions'; 

export default async function BlogDetail({ params }: { params: { id: string } }) {
  // 1. 获取 URL 参数
  const { id } = await params; 

  // 2. 查单条数据 (eq id)
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  // 404 处理
  if (!post) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">文章不存在</h1>
        <Link href="/" className="text-blue-500 hover:underline">返回首页</Link>
      </div>
    );
  }

  // 3. 绑定删除事件（把 ID 塞给 deletePost）
  const deletePostWithId = deletePost.bind(null, post.id);

  return (
    <div className="max-w-3xl mx-auto p-10 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← 返回首页
        </Link>

        {/* 删除按钮表单 */}
        <form action={deletePostWithId}>
          <button 
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm font-bold"
          >
            删除文章
          </button>
        </form>
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {post.title}
      </h1>
      
      <div className="flex gap-4 text-sm text-gray-500 mb-8 border-b pb-4">
        <span>分类: {post.category}</span>
        <span>发布时间: {new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 leading-relaxed text-lg text-gray-800 whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}