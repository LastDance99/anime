import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 0;
  border-radius: 0;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.subtext};
  cursor: pointer;
`;