import styled from "styled-components";

// 전체 페이지 감싸는 컨테이너
export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;      // 위에서 아래로 정렬 (헤더, 내용, 등)
  align-items: center;
  background: #FCEEF5;
`;

// 메인 내용 박스 (양쪽 컬럼 감쌈)
export const MainBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;         // 좌우로 컬럼 배치
  gap: 40px;
  margin: 20px 0; 
  align-items: flex-start;     // 컬럼 위쪽 정렬
  box-sizing: border-box;
  position: relative;
`;

// 왼쪽 컬럼 (센터, 프로필, 소개, 코멘트, 애니리스트)
export const ProfileLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 430px;
  min-width: 410px;
  box-sizing: border-box;
`;

// 오른쪽 컬럼 (내 활동, 채팅 등)
export const ProfileRightColumn = styled.div`
  flex: 1;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
`;

export const Sidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
`;