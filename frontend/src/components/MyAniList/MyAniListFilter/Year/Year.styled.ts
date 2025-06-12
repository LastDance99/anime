import styled from "styled-components";

export const Wrapper = styled.div`
  background: #f4f7fa;
  padding: 16px 12px 10px 12px;
  border-radius: 14px;
`;

export const Label = styled.div`
  font-size: 1rem;
  color: #7c8ba1;
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

export const Slider = styled.input`
  width: 98%;
  accent-color: #b87cc6;  // 크롬 등 최신 브라우저에서 트랙/버튼 컬러 지원
  height: 4px;
  margin-top: 6px;
  border-radius: 4px;
  background: #fff;
  outline: none;

  // Webkit(크롬/엣지) 커스텀
  &::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #b87cc6 65%, #c195be 100%);
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(180,120,180,0.14);
    border: 2.2px solid #b87cc6;
    cursor: pointer;
    transition: background 0.2s;
  }
  &::-webkit-slider-runnable-track {
    height: 7px;
    border-radius: 6px;
    background: #fff;
  }

  // Firefox
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #b87cc6 65%, #c195be 100%);
    border-radius: 50%;
    border: 2.2px solid #b87cc6;
    cursor: pointer;
  }
  &::-moz-range-track {
    height: 7px;
    border-radius: 6px;
    background: #fff;
  }
  // IE
  &::-ms-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #b87cc6 65%, #c195be 100%);
    border-radius: 50%;
    border: 2.2px solid #b87cc6;
    cursor: pointer;
  }
  &::-ms-fill-lower, &::-ms-fill-upper {
    background: #fff;
    border-radius: 6px;
  }
`;