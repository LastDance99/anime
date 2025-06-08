export interface User {
  backimg: string;
  avatar: string;
  name: string;
  email: string;
  likes: number;
  intro: string;
  points: number;
};

export interface ProfileCardProps {
  user: User;
}