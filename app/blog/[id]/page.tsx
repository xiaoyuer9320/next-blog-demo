import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';       // 引入 Markdown 渲染器
import { Metadata } from 'next';                  // SEO 类型
import DeleteButton from './DeleteButton';        // 引入删除按钮组件

interface Props {
  params: Promise<{ id: string }>;
}

// 1. 动态生成 SEO (浏览器标签页标题)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('id', id)
    .single();

  if (!post) return { title: '文章不存在' };

  return {
    title: post.title,
    description: post.content.slice(0, 100),
  };
}

export default async function BlogDetail({ params }: Props) {
  const { id } = await params;

  // 2. 查文章详情
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  // 404 处理
  if (!post) {
    return (
      <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">文章不存在</h1>
        <Link href="/" className="text-blue-500 hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 min-h-screen">
      {/* 顶部导航 */}
      <div className="flex justify-between items-center mb-10">
        <Link href="/" className="text-gray-500 hover:text-blue-600 transition">← 返回首页</Link>

        <div className="flex gap-3">
          {/* 编辑按钮 */}
          <Link href={`/blog/${id}/edit`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-bold shadow-sm">
              编辑
            </button>
          </Link>

          {/* 删除按钮 (客户端组件) */}
          <DeleteButton postId={post.id} />
        </div>
      </div>
      
      {/* 文章头部 */}
      <header className="mb-10 border-b border-gray-200 pb-8">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

        <div className="text-gray-500 text-sm">
          发布于 {new Date(post.created_at).toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai', // 强制使用中国时区 (关键！否则部署后会差8小时)
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 使用 24 小时制 (14:00 而不是 下午2:00)
          })}
        </div>
      </header>
      
      {/* 文章正文 (Markdown 渲染) */}
      {/* prose 是 @tailwindcss/typography 提供的样式类，负责排版 */}
      <article className="prose prose-lg max-w-none hover:prose-a:text-blue-600">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}