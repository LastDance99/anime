import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  background: #FCEEF5;
`;

export const Container = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Main = styled.div`
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Sidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
`;