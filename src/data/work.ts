export type WorkCategory = 'photography' | 'website' | 'marketing';

export interface WorkItem {
  id: string;
  title: string;
  category: WorkCategory;
  description: string;
  year: string;
  image: string;
  tags: string[];
}

export const workItems: WorkItem[] = [
  {
    id: '1',
    title: '品牌形象攝影',
    category: 'photography',
    description: '為本地餐廳拍攝產品與空間照片，提升菜單視覺質感與品牌一致性。',
    year: '2025',
    image: '/photos/placeholder.jpg',
    tags: ['攝影', '品牌'],
  },
  {
    id: '2',
    title: 'WordPress 電商網站',
    category: 'website',
    description: '建置 WooCommerce 電商平台，含商品管理、金流串接與 SEO 基礎設定。',
    year: '2025',
    image: '/photos/placeholder.jpg',
    tags: ['WordPress', 'WooCommerce'],
  },
  {
    id: '3',
    title: '社群行銷活動',
    category: 'marketing',
    description: '規劃執行 Instagram 與 Facebook 季度行銷活動，帳號觸及率成長 40%。',
    year: '2025',
    image: '/photos/placeholder.jpg',
    tags: ['行銷', '社群'],
  },
  {
    id: '4',
    title: '個人品牌寫真',
    category: 'photography',
    description: '個人品牌寫真，搭配白底與戶外場景，用於 LinkedIn 與個人官網。',
    year: '2024',
    image: '/photos/placeholder.jpg',
    tags: ['攝影', '人像'],
  },
  {
    id: '5',
    title: '品牌官方網站',
    category: 'website',
    description: '從設計稿到上線的品牌官網，含 SEO 優化與 Google Analytics 串接。',
    year: '2024',
    image: '/photos/placeholder.jpg',
    tags: ['WordPress', 'SEO'],
  },
  {
    id: '6',
    title: '商業活動紀錄',
    category: 'photography',
    description: '企業年終晚宴與產品發表會的全程攝影記錄，交付高解析度精修照片。',
    year: '2024',
    image: '/photos/placeholder.jpg',
    tags: ['攝影', '活動'],
  },
];
