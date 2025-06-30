const theme = {
  colors: {
    primary: '#FCEEF5',
    secondary: '#FFD1DC',
    bordermain: '#FFB2C6',
    subcolor: '#F0F8FF',
    text: '#222',
    subtext: '#999',
    background: '#fff',
  },
  fonts: {
    main: "'Quicksand', sans-serif",
    cute: "'UhBee mysen', sans-serif",
    cuteBold: "'UhBee Se_hyun', sans-serif",
    cafe24: "'Cafe24 Ssurround', sans-serif",
    cafe24Light: "'Cafe24 Ssurround air', sans-serif",
  },
  Weights: {
    normal: 400,
    medium: 500,
    bold: 700,
    light: 300,
  },
  fontSizes: {
    xxxs: '0.5rem',   // 8px
    xxs: '0.5625rem', // 9px
    xs: '0.625rem',   // 10px
    ss: '0.6875rem',  // 11px
    sm: '0.75rem',    // 12px
    md: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.375rem',  // 22px
    xxxl: '1.5rem',   // 24px
  },
  lineHeights: {
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacings: {
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  display: {
    h1: '2rem', // 32px
    h2: '1.75rem', // 28px
  },
  media: {
    // 공통
    mobile: "@media (max-width: 768px)",
    tablet: "@media (max-width: 1024px)",

    // iOS 디바이스
    iosMax: "@media (max-width: 428px)",     // iPhone Pro Max
    iosMid: "@media (max-width: 390px)",     // iPhone 12~14 일반
    iosSE: "@media (max-width: 375px)",      // iPhone SE 2세대

    // Android 디바이스
    androidLarge: "@media (max-width: 432px)", // 갤럭시 울트라급
    androidMid: "@media (max-width: 411px)",   // 일반 안드로이드 기기
    androidSmall: "@media (max-width: 360px)", // 소형 안드로이드
  }
};



export default theme;