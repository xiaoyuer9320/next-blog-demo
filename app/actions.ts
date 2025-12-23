'use server'; // 🚨 必须写！标记这是在服务器运行的代码

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache'; // 用于刷新页面缓存
import { redirect } from 'next/navigation';  // 用于页面跳转

/**
 * 1. 发布文章
 * @param formData 前端表单提交的数据对象
 */
export async function createPost(formData: FormData) {
  // 从表单获取数据，name 必须对应 input 的 name
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  // 存入 Supabase
  const { error } = await supabase.from('posts').insert({
    title,
    category,
    content,
  });

  if (error) {
    console.error('保存失败:', error);
    return; // 实际开发建议返回错误信息给前端
  }

  // 刷新首页缓存，让新文章立刻显示
  revalidatePath('/');
  // 跳转回首页
  redirect('/');
}

/**
 * 2. 更新文章
 * @param id 文章 ID
 * @param formData 表单数据
 */
export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  // 更新数据库
  const { error } = await supabase
    .from('posts')
    .update({ title, category, content })
    .eq('id', id);

  if (error) {
    console.error('更新失败:', error);
    return;
  }

  // 刷新首页和详情页的缓存
  revalidatePath('/');
  revalidatePath(`/blog/${id}`);
  
  // 更新完跳回详情页看效果
  redirect(`/blog/${id}`);
}

/**
 * 3. 删除文章
 * @param id 文章 ID
 */
export async function deletePost(id: number) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('删除失败:', error);
    return;
  }

  // 刷新首页缓存
  revalidatePath('/');
  // 删完了，详情页不存在了，跳回首页
  redirect('/');
}