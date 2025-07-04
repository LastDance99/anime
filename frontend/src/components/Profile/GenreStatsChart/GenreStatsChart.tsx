import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { getGenreStats } from "../../../api/profile";
import { useTranslation } from "react-i18next";

const PASTEL_COLORS = [
  "#ffd6e0", "#cdeaff", "#fff6ad",
  "#bdf6d7", "#fbe4ff", "#ffe3d3", "#ffe7fa"
];

const FONT_CUTE = "'Cafe24Ssurround', 'Jua', 'GmarketSansMedium', 'sans-serif'";

type GenreStat = { genre: string; count: number; };

type Props = {
  userId: number;
  limit?: number;
};

const GenreStatsChart: React.FC<Props> = ({ userId, limit = 5 }) => {
  const [genres, setGenres] = useState<GenreStat[]>([]);
  const [total, setTotal] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: GenreStat[] = await getGenreStats(userId, limit);
        const totalCount = data.reduce((acc, cur) => acc + cur.count, 0);
        setGenres(data);
        setTotal(totalCount);
      } catch (err) {
        console.error("장르 통계 로딩 실패", err);
      }
    };
    fetchData();
  }, [userId, limit]);

  return (
    <Wrapper>
      <Title>{t("profile.genre_stats.title")}</Title>
      {genres.length === 0 ? (
        <NoData>{t("profile.genre_stats.no_data")}</NoData>
      ) : (
        <ChartBox>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={genres}
              margin={{ top: 10, right: 10, left: 0, bottom: 32 }}
              barCategoryGap={40}
            >
              <XAxis
                dataKey="genre"
                tick={{ fontSize: 12, fontFamily: FONT_CUTE, fill: "#a5a5a5" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#fff8fc",
                  border: "1px solid #ffd6e0",
                  borderRadius: 14,
                  fontFamily: FONT_CUTE,
                  fontSize: 15,
                  color: "#7d5fff",
                }}
                cursor={{ fill: "#ffd6e035" }}
                formatter={(value: any) => {
                  const percent =
                    total && typeof value === "number"
                      ? Math.round((value / total) * 100)
                      : 0;
                  return [`${value}${t("common.count_unit")} (${percent}%)`, t("common.times")];
                }}
                labelFormatter={(label: string) =>
                  `${t("profile.genre_stats.tooltip_genre")}: ${label}`
                }
              />
              <Bar
                dataKey="count"
                name={t("common.times")}
                radius={[12, 12, 12, 12]}
                barSize={32}
                label={false}
              >
                {genres.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={PASTEL_COLORS[i % PASTEL_COLORS.length]}
                    stroke="#f6f6ff"
                    strokeWidth={2.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      )}
    </Wrapper>
  );
};

export default GenreStatsChart;

// --- styled-components ---
const Wrapper = styled.div`
  margin-top: 32px;
  background: #fffafd;
  border-radius: 24px;
  padding: 32px 12px 16px 12px;
  box-shadow: 0 2px 8px 0 rgba(220, 180, 255, 0.09);
`;

const Title = styled.h4`
  font-size: 1.18rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: #9b72cb;
  font-family: ${FONT_CUTE};
`;

const NoData = styled.div`
  color: #b2b2b2;
  text-align: center;
  padding: 34px 0;
  font-family: ${FONT_CUTE};
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;