import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: #f6e7ef;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
`;