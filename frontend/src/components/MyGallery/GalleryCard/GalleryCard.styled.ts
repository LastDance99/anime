import styled from "styled-components";

export const Card = styled.div`
  width: 160px;
  height: 180px;
  background: #fefefe;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: #ddd;
`;

export const Caption = styled.div`
  padding: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  color: #333;
  background: #fff;
  flex: 1;
`;