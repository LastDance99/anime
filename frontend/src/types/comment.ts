export type Comment = {
  id: number;
  postId: number;
  authorId: number;
  nickname: string;
  profileImage: string;
  content: string;
  createdAt: string;
  parentId?: number;
  taggedNickname?: string;
  isDeleted: boolean;
  likeCount?: number;
  liked?: boolean;
};