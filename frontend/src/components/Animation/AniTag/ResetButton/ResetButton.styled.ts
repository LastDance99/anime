import styled from "styled-components";

export const ResetButtonBox = styled.div`
  width: 180px;
  margin-bottom: 20px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f99;
  padding-bottom: 20px;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const ResetButtonStyled = styled.button`
  color: #d75a85;
  border: none;
  border-radius: 10px;
  padding: 0 12px;
  font-weight: 500;
  font-size: 10px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #ffd4df;
  }
`;