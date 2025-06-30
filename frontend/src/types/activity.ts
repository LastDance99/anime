export type ActivityType =
  | 'list_add'
  | 'list_del'
  | 'anime_add'
  | 'anime_remove'
  | 'post'
  | 'comment'
  | 'review_add'
  | 'review_del';

export interface ActivityBase {
  id: number;
  type: ActivityType;
  nickname: string;
  profile_image: string;
  created_at: string;
}

export interface ActivityAnimeAdd extends ActivityBase {
  type: 'anime_add';
  anime_title: string;
  anime_img: string;
}

export interface ActivityAnimeRemove extends ActivityBase {
  type: 'anime_remove';
  anime_title: string;
  anime_img: string;
}

export interface ActivityListAdd extends ActivityBase {
  type: 'list_add';
  anime_title: string;
  anime_img: string;
}

export interface ActivityListDel extends ActivityBase {
  type: 'list_del';
  anime_title: string;
  anime_img: string;
}

export interface ActivityPost extends ActivityBase {
  type: 'post';
  post_id: number;
  post_title: string;
  content: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
}

export interface ActivityComment extends ActivityBase {
  type: 'comment';
  post_id: number;
  post_title: string;
  comment: string;
  post_author_nickname: string;
  post_author_profile_image: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
}

export interface ActivityReviewAdd extends ActivityBase {
  type: 'review_add';
  anime_title: string;
  anime_img: string;
  review: string;
}

export interface ActivityReviewDel extends ActivityBase {
  type: 'review_del';
  anime_title: string;
  anime_img: string;
  review?: string;
}

export type Activity =
  | ActivityListAdd
  | ActivityListDel
  | ActivityAnimeAdd
  | ActivityAnimeRemove
  | ActivityPost
  | ActivityComment
  | ActivityReviewAdd
  | ActivityReviewDel;