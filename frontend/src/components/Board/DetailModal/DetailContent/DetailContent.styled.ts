import styled from "styled-components";

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isNotice",
})<{ $isNotice?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 16px;
`;

export const CategoryText = styled.div<{ $type?: "board" | "gallery" | "notice"}>`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ $type }) =>
    $type === "gallery"
      ? "#de3e5b"
      : $type === "notice"
      ? "#ff8000"
      : "#2071b2"
  };
  font-weight: ${({ $type, theme }) =>
    $type === "notice"
      ? theme.Weights.bold
      : theme.Weights.medium
  };
  letter-spacing: 0.05em;
`;

export const TitleText = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin-bottom: 4px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.div`
  font-weight: ${({ theme }) => theme.Weights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const Meta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
`;

export const ContentBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 6px;
  padding: 16px;
  overflow: hidden;
  height: 900px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MainImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 240px;
  border-radius: 6px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MoreLink = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  cursor: pointer;
`;

export const IconButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconBtn = styled.button<{ $liked?: boolean }>`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  color: ${({ $liked, theme }) =>
    $liked ? theme.colors.bordermain : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.bordermain};
  }
`;

export const HtmlContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  word-break: break-word;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px auto;
    border-radius: 8px;
  }

  iframe {
    max-width: 100%;
    height: 340px;
    display: block;
    margin: 24px auto;
    border-radius: 12px;
  }
`;

export const NoticeBadge = styled.span`
  color: #ff5722;
  font-weight: 700;
  background: #fff0e0;
  border-radius: 6px;
  font-size: 18px;
  padding: 2px 10px;
  margin-right: 12px;
  letter-spacing: -1px;
`;