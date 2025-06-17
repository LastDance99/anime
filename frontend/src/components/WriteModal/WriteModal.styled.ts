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
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #6c5ce7;
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  color: #333;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6c5ce7;
  }

  option {
    background: white;
    color: black;
  }
`;

export const EditorWrapper = styled.div`
  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    border-color: #ccc;
  }
  .ql-container {
    border-radius: 0 0 8px 8px;
    border-color: #ccc;
  }
  .ql-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto; 
    font-size: 1rem;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  margin-top: 8px;
  padding: 10px 14px;
  background: #eee;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;

  &:hover {
    background: #ddd;
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
    border: 1px solid #ccc;
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 12px 24px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: #5a4ed1;
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
