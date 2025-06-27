import styled from "styled-components";
import { Star } from "lucide-react";

// 썸네일 이미지
export const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  transition: 
    transform 0.22s cubic-bezier(.3,1.3,.6,1),
    box-shadow 0.20s,
    z-index 0.1s;
`;

// 제목 텍스트
export const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  max-width: 500px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: color 0.18s;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 장르 텍스트
export const Genre = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  min-width: 180px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  transition: color 0.18s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 평점 텍스트
export const Score = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: #ff5e85; // 이건 강조 색이라 유지하거나 테마에 추가 가능
  min-width: 36px;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: color 0.18s;
`;

// 카드 전체
export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 4px 20px;
  cursor: pointer;
  position: relative;
  transition:
    box-shadow 0.22s,
    transform 0.16s cubic-bezier(.4,1.2,.5,1),
    background 0.15s;

  &:hover {
    transform: scale(1.015);
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 10px 34px 0 ${({ theme }) => theme.colors.primary}, 0 3px 16px rgba(0,0,0,0.10);
    z-index: 2;
  }

  &:hover ${Thumbnail} {
    transform: scale(2);
    box-shadow: 0 10px 30px 0 ${({ theme }) => theme.colors.primary};
    z-index: 3;
  }

  &:hover ${Title} {
    color: #b2276e; // 포인트 컬러, 테마에 추가 고려
  }

  &:hover ${Genre} {
    color: #ff76a1;
  }

  &:hover ${Score} {
    color: #b2276e;
  }
`;

export const CornerStar = styled(Star)`
  position: absolute;
  top: 30%;
  left: 67px;
  fill: gold;
  stroke: #Fff;
  width: 20px;
  height: 20px;
  z-index: 2;
`;

// 메뉴 버튼
export const MenuBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  padding: 0;
`;

// 드롭다운 박스
export const MenuDropdown = styled.div`
  position: absolute;
  top: 0px;
  right: -154px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.14);
  min-width: 130px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 드롭다운 항목
export const MenuItem = styled.button`
  padding: 12px 18px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

