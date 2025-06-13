import styled from "styled-components";

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

export const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  min-width: 360px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: color 0.18s;
  word-break: keep-all;
  white-space: nowrap;       // 줄바꿈 X
  overflow: hidden;          // 넘치는 글자 숨김
  text-overflow: ellipsis;   // 말줄임표(...)
`;

export const Genre = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  min-width: 120px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  transition: color 0.18s;
  white-space: nowrap;       // 줄바꿈 X
  overflow: hidden;          // 넘치는 글자 숨김
  text-overflow: ellipsis;   // 말줄임표(...)
`;

export const Score = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: #ff5e85;
  min-width: 36px;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: color 0.18s;
`;

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;;
  padding: 4px 20px;
  // box-shadow: 0 2px 10px ${({ theme }) => theme.colors.primary};
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
    color: #b2276e;
  }
  &:hover ${Genre} {
    color: #ff76a1;
  }
  &:hover ${Score} {
    color: #b2276e;
  }
`;

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

export const MenuDropdown = styled.div`
  position: absolute;
  top: 0px;
  right: -140px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.14);
  min-width: 130px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MenuItem = styled.button`
  padding: 12px 18px;
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  &:hover {
    background: #ffe9f4;
  }
`;