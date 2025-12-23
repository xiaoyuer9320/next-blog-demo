import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// 强制动态渲染：防止 Next.js 缓存旧数据，保证每次刷新都是最新的
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. 去数据库查所有文章
  // .select('*') 查所有列
  // .order 按照创建时间倒序（最新的在前面）
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">连接出错: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* 头部区域 */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">我的全栈博客</h1>
        <p className="text-gray-500 mt-2">数据来自 Supabase 云端 • 基于 Next.js 15</p>
        
        {/* 新增按钮 */}
        <Link href="/blog/create">
          <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition shadow-md">
            + 写文章
          </button>
        </Link>
      </div>

      {/* 文章卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full border border-transparent hover:border-blue-500">
              <div className="text-sm text-blue-500 font-bold mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {post.title}
              </h2>
              {/* line-clamp-2: 超过两行自动显示省略号 */}
              <p className="text-gray-600 line-clamp-2">
                {post.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}