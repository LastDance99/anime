import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 폰트, 박스 사이징 기본값 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
  font-size: 16px; /* rem 기준 설정 */
  height: 100%;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth; /* 선택사항 */
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif
    font-size: 1rem; /* 1rem = 16px */
    font-weight: 400;
    line-height: 1.5;
    color: #222;
    background-color: #fff;
    transition: background-color 0.3s, color 0.3s;
  }

  /* 기본 태그 초기화 */
  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, textarea {
    font: inherit;
    border: none;
    outline: none;
  }

  /* 폰트 설정 */
  @font-face {
    font-family: 'Quicksand';
    src: url('/fonts/quicksand/Quicksand-SemiBold.woff2') format('woff2'),
        url('/fonts/quicksand/Quicksand-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
      font-family: 'Quicksand';
      src: url('/fonts/quicksand/Quicksand-Bold.woff2') format('woff2'),
          url('/fonts/quicksand/Quicksand-Bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Quicksand';
      src: url('/fonts/quicksand/Quicksand-Regular.woff2') format('woff2'),
          url('/fonts/quicksand/Quicksand-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Quicksand';
      src: url('/fonts/quicksand/Quicksand-Light.woff2') format('woff2'),
          url('/fonts/quicksand/Quicksand-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Quicksand';
      src: url('/fonts/quicksand/Quicksand-Medium.woff2') format('woff2'),
          url('/fonts/quicksand/Quicksand-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Cafe24 Ssurround';
      src: url('/fonts/cafe24ssurround/Cafe24Ssurround.woff2') format('woff2'),
          url('/fonts/cafe24ssurround/Cafe24Ssurround.woff') format('woff');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Cafe24 Ssurround air';
      src: url('/fonts/cafe24ssurroundair/Cafe24Ssurroundair.woff2') format('woff2'),
          url('/fonts/cafe24ssurroundair/Cafe24Ssurroundair.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
    font-family: 'UhBee mysen';
    src: url('/fonts/uhbeemysen/UhBeemysen.woff2') format('woff2'),
        url('/fonts/uhbeemysen/UhBeemysen.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
      font-family: 'UhBee mysen';
      src: url('/fonts/uhbeemysen/UhBeemysenBold.woff2') format('woff2'),
          url('/fonts/uhbeemysen/UhBeemysenBold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'UhBee Se_hyun';
      src: url('/fonts/UhBeeSe_hyunBold.woff2') format('woff2'),
          url('/fonts/UhBeeSe_hyunBold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'UhBee Se_hyun';
      src: url('/fonts/uhbeese_hyun/UhBeeSe_hyun.woff2') format('woff2'),
          url('/fonts/uhbeese_hyun/UhBeeSe_hyun.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
  }

`;

export default GlobalStyle;