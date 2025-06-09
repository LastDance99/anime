export interface ActivityBase {
  id: number;
  type: string;
  nickname: string;
  profile_image: string;
  created_at: string;
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
  post_title: string;
  content: string;
}
export interface ActivityComment extends ActivityBase {
  type: 'comment';
  post_title: string;
  comment: string;
  post_author_nickname: string;           
  post_author_profile_image: string;
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
  | ActivityPost
  | ActivityComment
  | ActivityReviewAdd
  | ActivityReviewDel;