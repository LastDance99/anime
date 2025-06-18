import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 24px;
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.Weights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const Input = styled.input`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  option {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const EditorWrapper = styled.div`
  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    border-color: ${({ theme }) => theme.colors.bordermain};
    background: ${({ theme }) => theme.colors.subcolor};
  }

  .ql-container {
    border-radius: 0 0 8px 8px;
    border-color: ${({ theme }) => theme.colors.bordermain};
    background: ${({ theme }) => theme.colors.background};
  }

  .ql-editor {
    min-height: 200px;
    height: 1200px;
    overflow-y: auto;
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  margin-top: 8px;
  padding: 10px 14px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.subcolor};
  }
`;

export const ImagePreviewBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.bordermain};
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bordermain};
  }
`;

export const FileUploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;

  input[type="file"] {
    flex: 1;
  }
`;

export const GlobalQuillImageStyle = styled.div`
  .ql-align-center {
    text-align: center;
  }

  .ql-align-center img {
    display: inline-block;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;