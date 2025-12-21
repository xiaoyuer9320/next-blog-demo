'use server'; // 👈 必不可少

import { supabase } from '@/lib/supabase'; // 如果报错，尝试换成 '../lib/supabase'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 1. 发布文章
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  const { error } = await supabase.from('posts').insert({
    title,
    category,
    content,
  });

  if (error) {
    console.error('保存失败:', error);
    return;
  }

  revalidatePath('/'); // 刷新首页
  redirect('/');       // 跳回首页
}

// 2. 删除文章
export async function deletePost(id: number) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('删除失败:', error);
    return;
  }

  revalidatePath('/'); // 刷新首页
  redirect('/');       // 跳回首页
}