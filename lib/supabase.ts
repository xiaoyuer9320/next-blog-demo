import { createClient } from '@supabase/supabase-js';

// 读取环境变量（感叹号 ! 表示我确定这个变量一定存在，TS 别报错）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 创建并导出客户端实例
export const supabase = createClient(supabaseUrl, supabaseKey);