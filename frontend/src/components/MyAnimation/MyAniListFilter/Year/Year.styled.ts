import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 16px 14px 14px 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  letter-spacing: 0.025em;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const YearValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.Weights.medium};
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.subtext};
`;

export const ResetButton = styled.button`
  margin-left: auto;
  background: ${({ theme }) => theme.colors.subcolor};
  color: ${({ theme }) => theme.colors.bordermain};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  padding: 2px 10px;
  cursor: pointer;
  transition: background 0.16s;
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Slider = styled.input`
  width: 100%;
  margin-top: 6px;
  height: 2.5px;
  background: transparent;
  outline: none;
  appearance: none;

  // Chrome/Edge/Safari
  &::-webkit-slider-runnable-track {
    height: 3.5px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 2px;
    box-shadow: 0 0 0 1.5px ${({ theme }) => theme.colors.primary}33 inset;
  }
  &::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.subcolor};
    box-shadow: 0 1px 8px ${({ theme }) => theme.colors.secondary}55;
    border: 2px solid ${({ theme }) => theme.colors.bordermain};
    margin-top: -7.5px;
    cursor: pointer;
    transition: background 0.16s, border 0.15s;
    appearance: none;
  }

  // Firefox
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.subcolor};
    box-shadow: 0 1.5px 8px ${({ theme }) => theme.colors.secondary}55;
    border: 2px solid ${({ theme }) => theme.colors.bordermain};
    cursor: pointer;
    appearance: none;
    transition: background 0.16s, border 0.15s;
  }
  &::-moz-range-track {
    height: 3.5px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 2px;
    box-shadow: 0 0 0 1.5px ${({ theme }) => theme.colors.primary}33 inset;
  }

  // IE/Edge
  &::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.subcolor};
    box-shadow: 0 1px 8px ${({ theme }) => theme.colors.secondary}55;
    border: 2px solid ${({ theme }) => theme.colors.bordermain};
    cursor: pointer;
    appearance: none;
    transition: background 0.16s, border 0.15s;
  }
  &::-ms-fill-lower, &::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 2px;
    box-shadow: 0 0 0 1.5px ${({ theme }) => theme.colors.primary}33 inset;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.bordermain}22;
  }

  // Remove background for Firefox
  background: transparent;
`;