import React from "react";
import { Button } from "./ChangeButton.styled";

type Props = {
  label: string;
  onClick: () => void;
};

export default function ChangeButton({ label, onClick }: Props) {
  return <Button onClick={onClick}>{label}</Button>;
}