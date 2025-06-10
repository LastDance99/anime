import styled from "styled-components";

export const CardBox = styled.div`
  border: 1.5px solid #f99;
  border-radius: 14px;
  overflow: hidden;
  background: white;
  text-align: center;
  padding: 12px 8px 10px 8px;
  box-shadow: 0 2px 8px rgba(255, 168, 168, 0.08);
  transition: 0.15s;
  &:hover {
    box-shadow: 0 4px 16px rgba(255, 168, 168, 0.18);
    border-color: #fdafd8;
  }
`;

export const AniImg = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const AniTitle = styled.div`
  font-size: 1.03rem;
  font-weight: 600;
  color: #d75a85;
  margin-top: 2px;
`;