import React, { useEffect, useState } from "react";
import { getBoardNotices, getBoardPopular, getBoardRecommend } from "../../api/board";
import DetailModal from "./DetailModal/DetailModal";

import {
  SideWidgetBox,
  WidgetTitle,
  WidgetSection,
  List,
  ListItem,
  PostButton,
  PostMeta,
  WidgetDivider,
  WidgetSectionTitle,
} from "./BoardSideWidget.styled";

export interface BoardAuthor {
  id: number;
  nickname: string;
  profile_image?: string;
}

export interface BoardItem {
  id: number;
  category?: string;
  board_type: string;
  title: string;
  content?: string;
  views: number;
  comment_count: number;
  like_count: number;
  images?: string[];
  thumbnail?: string;
  created_at: string;
  updated_at?: string | null;
  author?: BoardAuthor;
  author_nickname: string;
  author_profile_image?: string;
  is_liked?: boolean;
}

export default function BoardSideWidget() {
  const [notices, setNotices] = useState<BoardItem[]>([]);
  const [popular, setPopular] = useState<BoardItem[]>([]);
  const [recommend, setRecommend] = useState<BoardItem[]>([]);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'post' | 'gallery' | null>(null);

  useEffect(() => {
    getBoardNotices().then(setNotices);
    getBoardPopular().then(setPopular);
    getBoardRecommend().then(setRecommend);
  }, []);

  const getTypeFromPost = (post: BoardItem): 'post' | 'gallery' => {
    const val = (post.category || post.board_type || '').toLowerCase();
    if (val.includes('gallery') || val === '갤러리') return 'gallery';
    return 'post';
  };

  const handleOpenModal = (post: BoardItem) => {
    setSelectedPostId(post.id);
    setSelectedType(getTypeFromPost(post));
  };
  const handleCloseModal = () => {
    setSelectedPostId(null);
    setSelectedType(null);
  };

  return (
    <SideWidgetBox>
      <WidgetTitle>공지사항</WidgetTitle>
      <WidgetSection>
        <List>
          {notices.map(post => (
            <ListItem key={post.id}>
              <PostButton onClick={() => handleOpenModal(post)}>
                {post.title}
              </PostButton>
            </ListItem>
          ))}
        </List>
      </WidgetSection>
      <WidgetDivider />

      <WidgetSectionTitle>오늘의 인기글</WidgetSectionTitle>
      <WidgetSection>
        <List>
          {popular.map(post => (
            <ListItem key={post.id}>
              <PostButton onClick={() => handleOpenModal(post)}>
                {post.title}
                <PostMeta>({post.like_count}👍/{post.comment_count}💬)</PostMeta>
              </PostButton>
            </ListItem>
          ))}
        </List>
      </WidgetSection>
      <WidgetDivider />

      <WidgetSectionTitle>추천글</WidgetSectionTitle>
      <WidgetSection>
        <List>
          {recommend.map(post => (
            <ListItem key={post.id}>
              <PostButton onClick={() => handleOpenModal(post)}>
                {post.title}
              </PostButton>
            </ListItem>
          ))}
        </List>
      </WidgetSection>
      {selectedPostId && selectedType && (
        <DetailModal
          type={selectedType}
          id={selectedPostId}
          onClose={handleCloseModal}
        />
      )}
    </SideWidgetBox>
  );
}