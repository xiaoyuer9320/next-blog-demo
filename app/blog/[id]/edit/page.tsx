import { supabase } from '@/lib/supabase';
import { updatePost } from '@/app/actions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  // 1. 查旧数据用于回填
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) return <div>文章不存在</div>;

  // 2. 使用 bind 预填充 ID 参数给 updatePost 函数
  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">编辑文章</h1>

        <form action={updatePostWithId} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input 
              name="title" type="text" required 
              defaultValue={post.title} // 👈 回显旧数据
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <input 
              name="category" type="text" required 
              defaultValue={post.category} 
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
            <textarea 
              name="content" required rows={10} 
              defaultValue={post.content} 
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">
            💾 保存修改
          </button>
        </form>
      </div>
    </div>
  );
}