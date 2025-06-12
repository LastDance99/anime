import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const Thumbnail = styled.img`
  width: 44px;
  height: 62px;
  border-radius: 6px;
  object-fit: cover;
`;

export const Title = styled.div`
  font-weight: 600;
  color: #336;
  min-width: 180px;
`;

export const Genre = styled.div`
  font-size: 0.98rem;
  color: #5ca;
  margin-left: 16px;
  min-width: 80px;
`;

export const Score = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff758c;
  margin-left: 16px;
  min-width: 36px;
`;