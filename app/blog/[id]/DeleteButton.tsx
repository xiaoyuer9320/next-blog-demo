'use client'; // 🚨 必须写！标记这是客户端组件，因为用到了 onClick 和 window

import { deletePost } from '../../actions';
import { useState } from 'react';

export default function DeleteButton({ postId }: { postId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // 弹出浏览器自带的确认框
    const confirmed = window.confirm('😱 确定要删除这篇文章吗？删除后无法恢复！');

    if (confirmed) {
      setIsDeleting(true); // 设置加载状态，防止重复点击
      await deletePost(postId); // 调用后端删除
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`px-4 py-2 rounded-md text-sm font-bold shadow-sm transition
        ${isDeleting 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
    >
      {isDeleting ? '删除中...' : '删除'}
    </button>
  );
}