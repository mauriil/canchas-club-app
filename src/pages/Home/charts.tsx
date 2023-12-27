/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Paper, Typography } from "@mui/material";
import { LineWave } from "react-loader-spinner";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

interface UserStatsChartsInterface {
  loadingUserStats: boolean;
  userStats: any;
}

const UserStatsCharts = (props: UserStatsChartsInterface) => {
  const [mostPopularClubIndex, setMostPopularClubIndex] = useState(0);
  const onMostPopularClubEnter = (data: any, index: number) => {
    setMostPopularClubIndex(index);
  };

  const [mostVisitedFieldIndex, setMostVisitedFieldIndex] = useState(0);
  const onMostVisitedFieldEnter = (data: any, index: number) => {
    setMostVisitedFieldIndex(index);
  };

  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding={2}
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          textAlign: "center",
          flex: 1,
          width: {
            xs: "100%",
            sm: "auto",
          },
          backgroundColor: "white",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h2">Club más concurrido</Typography>
        <Typography
          variant="h1"
          sx={{
            marginTop: {
              sm: props.loadingUserStats ? 0 : "40px",
              xs: props.loadingUserStats ? 0 : "15px",
            },
          }}
        >
          {props.loadingUserStats &&
          props.userStats.mostVisitedClubs !== undefined ? (
            <LineWave
              height="100"
              width="100"
              color="#32d9cb"
              ariaLabel="line-wave"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBotton: "10px",
              }}
              visible={true}
            />
          ) : (
            <ResponsiveContainer width={400} height={300}>
              <PieChart width={300} height={300}>
                <Pie
                  activeIndex={mostPopularClubIndex}
                  activeShape={({
                    cx,
                    cy,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill,
                    payload,
                    midAngle,
                    percent,
                    value,
                  }: any) => {
                    const RADIAN = Math.PI / 180;
                    const sin = Math.sin(-RADIAN * midAngle);
                    const cos = Math.cos(-RADIAN * midAngle);
                    const sx = cx + (outerRadius + 10) * cos;
                    const sy = cy + (outerRadius + 10) * sin;
                    const mx = cx + (outerRadius + 30) * cos;
                    const my = cy + (outerRadius + 30) * sin;
                    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                    const ey = my;
                    const textAnchor = cos >= 0 ? "start" : "end";
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy}
                          dy={8}
                          fontSize={13}
                          textAnchor="middle"
                          fill={fill}
                        >
                          {payload.name}
                        </text>
                        <Sector
                          cx={cx}
                          cy={cy}
                          innerRadius={innerRadius}
                          outerRadius={outerRadius + 10}
                          startAngle={startAngle}
                          endAngle={endAngle}
                          fill={"#00a6c0"}
                        />
                        <path
                          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                          stroke={fill}
                          fill="none"
                        />
                        <circle
                          cx={ex}
                          cy={ey}
                          r={2}
                          fill={fill}
                          stroke="none"
                        />
                        <text
                          x={ex}
                          y={ey}
                          fontSize={15}
                          textAnchor={textAnchor}
                          fill="#333"
                        >{`${(percent * 100).toFixed(2)}%`}</text>
                      </g>
                    );
                  }}
                  data={props.userStats.chartData.mostVisitedClubs.map(
                    (club: any) => {
                      return {
                        name: club.clubName,
                        value: club.count,
                      };
                    }
                  )}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#A9C52F"
                  dataKey="value"
                  onMouseEnter={onMostPopularClubEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          textAlign: "center",
          flex: 1,
          width: {
            xs: "100%",
            sm: "auto",
          },
          backgroundColor: "white",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h2">Cancha más concurrida</Typography>
        <Typography
          variant="h1"
          sx={{
            marginTop: {
              sm: props.loadingUserStats ? 0 : "40px",
              xs: props.loadingUserStats ? 0 : "15px",
            },
          }}
        >
          {props.loadingUserStats ? (
            <LineWave
              height="100"
              width="100"
              color="#32d9cb"
              ariaLabel="line-wave"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBotton: "10px",
              }}
              visible={true}
            />
          ) : (
            <ResponsiveContainer width={400} height={300}>
              <PieChart width={300} height={300}>
                <Pie
                  activeIndex={mostVisitedFieldIndex}
                  activeShape={({
                    cx,
                    cy,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill,
                    payload,
                    midAngle,
                    percent,
                    value,
                  }: any) => {
                    const RADIAN = Math.PI / 180;
                    const sin = Math.sin(-RADIAN * midAngle);
                    const cos = Math.cos(-RADIAN * midAngle);
                    const sx = cx + (outerRadius + 10) * cos;
                    const sy = cy + (outerRadius + 10) * sin;
                    const mx = cx + (outerRadius + 30) * cos;
                    const my = cy + (outerRadius + 30) * sin;
                    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                    const ey = my;
                    const textAnchor = cos >= 0 ? "start" : "end";
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy}
                          dy={8}
                          fontSize={13}
                          textAnchor="middle"
                          fill={fill}
                        >
                          {payload.name}
                        </text>
                        <Sector
                          cx={cx}
                          cy={cy}
                          innerRadius={innerRadius}
                          outerRadius={outerRadius + 10}
                          startAngle={startAngle}
                          endAngle={endAngle}
                          fill={"#00a6c0"}
                        />
                        <path
                          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                          stroke={fill}
                          fill="none"
                        />
                        <circle
                          cx={ex}
                          cy={ey}
                          r={2}
                          fill={fill}
                          stroke="none"
                        />
                        <text
                          x={ex + (cos >= 0 ? 1 : -1) * 12}
                          y={ey}
                          fontSize={15}
                          textAnchor={textAnchor}
                          fill="#333"
                        >{`${(percent * 100).toFixed(2)}%`}</text>
                      </g>
                    );
                  }}
                  data={props.userStats.chartData.mostVisitedFields.map(
                    (field: any) => {
                      return {
                        name: field.fieldName,
                        value: field.count,
                      };
                    }
                  )}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#A9C52F"
                  dataKey="value"
                  onMouseEnter={onMostVisitedFieldEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          textAlign: "center",
          flex: 1,
          width: {
            xs: "100%",
            sm: "auto",
          },
          backgroundColor: "white",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h2">Horarios más concurridos</Typography>
        <Typography
          variant="h1"
          sx={{
            marginTop: {
              sm: props.loadingUserStats ? 0 : "40px",
              xs: props.loadingUserStats ? 0 : "15px",
            },
          }}
        >
          {props.loadingUserStats ? (
            <LineWave
              height="100"
              width="100"
              color="#32d9cb"
              ariaLabel="line-wave"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBotton: "10px",
              }}
              visible={true}
            />
          ) : (
            <ResponsiveContainer width={380} height={300}>
              <AreaChart
                width={150}
                height={300}
                data={props.userStats.chartData.mostVisitedHours.map(
                  (hourData: any) => {
                    return {
                      name: hourData._id,
                      Reservas: hourData.count,
                    };
                  }
                )}
                dataKey="Reservas"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={15} />
                <YAxis fontSize={20} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Reservas"
                  stroke="#A9C52F"
                  fill="#00a6c0"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Typography>
      </Paper>
    </Box>
  );
};
export default UserStatsCharts;
