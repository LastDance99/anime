import styled from "styled-components";

export const FilterSelectBox = styled.div`
  width: 100%;
  margin-bottom: 14px;
`;

export const FilterSelectLabel = styled.div`
  font-size: 0.98rem;
  color: ${({ theme }) => theme.colors.text || "#b087a3"};
  margin-bottom: 7px;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

export const FilterSelect = styled.select`
  width: 100%;
  background: ${({ theme }) => theme.colors.background || "#f4f7fa"};
  border: none;
  outline: none;
  font-size: 1.07rem;
  border-radius: 13px;
  padding: 10px 14px;
  color: ${({ theme }) => theme.colors.text || "#a06eb9"};
  font-weight: 500;
  transition: box-shadow 0.18s;
  appearance: none;
  box-shadow: 0 0 0 1px #f4d0ea inset;

  &:focus {
    box-shadow: 0 0 0 2px #e3a9d7 inset;
    background: #fff3fa;
  }
`;

export const FilterArrow = styled.span`
  position: absolute;
  right: 18px;
  top: 52%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text || "#d3b2cb"};
  font-size: 1.14rem;
`;