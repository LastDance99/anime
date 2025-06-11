import styled from "styled-components";

// 카드 전체
export const CardBox = styled.div`
  width: 120px;
  height: 170px;
  position: relative;
  background: white;
  overflow: hidden;
`;

// 이미지+오버레이+타이틀+버튼 감싸는 박스
export const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// 이미지
export const AniImg = styled.img`
  width: 120px;
  height: 170px;
  object-fit: cover;
  display: block;
`;

// 그림자/어두운 오버레이
export const ShadowBox = styled.div`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(
  to top,
  rgba(30, 16, 26, 0.8) 0%,
  rgba(30, 16, 26, 0.6) 35%,
  rgba(30, 16, 26, 0.35) 70%,
  transparent 100%);
  z-index: 1;
  pointer-events: none;
`;

// 이미지 중앙에 제목
export const AniTitle = styled.div`
  position: absolute;
  left: 0; 
  bottom: 4px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 4px rgba(30,0,40,0.24);
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// +버튼
export const AddButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  color: #ff5892;
  font-size: 1.22rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: 0.13s;
  &:hover {
    background: #ffe0ed;
    color: #d75a85;
  }
`;