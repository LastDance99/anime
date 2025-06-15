export interface BoardItem {
  id: number;
  category: string;
  boardType: string;
  img: string;
  title: string;
  content: string;
  nickname: string;
  authorId: number;
  authorProfileImage: string;
  time: string;
  comment: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
}