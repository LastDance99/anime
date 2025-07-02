import React, { useEffect, useState } from "react";
import { getUserAttendance } from "../../api/profile";
import styled from "styled-components";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";

const Board = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);

  .react-calendar {
    border: none;
    background: transparent;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
    border-radius: 8px;
  }

  .react-calendar__tile.marked {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 50%;
    font-weight: bold;
    transition: background 0.2s ease;
  }

  .react-calendar__tile.marked:hover {
    opacity: 0.9;
    filter: brightness(1.05);
    cursor: default;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.cuteBold};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.subcolor};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 12px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
`;

const CheckMark = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.bordermain};
  text-align: center;
  margin-top: 2px;
`;

type Props = {
  userId: number;
};

export default function AttendanceBoard({ userId }: Props) {
  const [dates, setDates] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    getUserAttendance(userId).then(({ dates, total_attendance, last_attendance }) => {
      setDates(dates);
      setTotal(total_attendance);
      setLast(last_attendance);
    });
  }, [userId]);

  return (
    <Board>
      <Title>📅 {t("attendance.title")}</Title>
      <Stats>
        <StatBox>{t("attendance.total")}: {total}{t("attendance.day_suffix")}</StatBox>
        <StatBox>{t("attendance.last")}: {last || t("attendance.none")}</StatBox>
      </Stats>
      <Calendar
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateStr = dayjs(date).format("YYYY-MM-DD");
            if (dates.includes(dateStr)) {
              return <CheckMark>✔</CheckMark>;
            }
          }
          return null;
        }}
      />
    </Board>
  );
}