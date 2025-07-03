import React, { useEffect, useState } from "react";
import { getUserAttendance } from "../../api/profile";
import styled from "styled-components";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-calendar";
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

const Board = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);

  min-width: 0;
  width: 100%;

  .react-calendar {
    border: none;
    background: transparent;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
    min-width: 0;
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.cuteBold};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};

  /* === 핵심 수정 === */
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;      /* 추가! 2줄 이상 허용 */
  min-width: 0;
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.subcolor};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 12px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  min-width: 80px;
  max-width: 240px;
  width: fit-content;

  /* === 핵심 수정 === */
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getUserAttendance(userId).then(({ dates, total_attendance, last_attendance }) => {
      setDates(dates);
      setTotal(total_attendance);
      setLast(last_attendance);
    });
  }, [userId]);

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <Board>
      <Title>📅 {t("attendance.title")}</Title>
      <Stats>
        <StatBox>{t("attendance.total")}: {total}{t("attendance.day_suffix")}</StatBox>
        <StatBox>{t("attendance.last")}: {last || t("attendance.none")}</StatBox>
      </Stats>
      <Calendar
        locale={i18n.language}
        formatDay={(locale, date) => String(date.getDate())}
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