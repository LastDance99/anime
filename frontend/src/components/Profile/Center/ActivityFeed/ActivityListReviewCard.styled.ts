import styled from "styled-components";


export const BaseCard = styled.div<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.secondary}55;
  position: relative;
  padding: 14px 18px;        /* 추가 */
  box-sizing: border-box;    /* 추가 */

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const AnimeImg = styled.img`
  width: 56px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 10px;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  margin-left: auto;
  min-width: 50px;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.main};
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const AniTitle = styled.div`
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const Title = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: bold;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: normal;
`;

export const SideInfoBox = styled.div`
  min-width: 40px;
  max-width: 100px;
  text-align: center;
  padding-right: 6px;
  height: 80%;

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;