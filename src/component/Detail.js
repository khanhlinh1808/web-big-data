import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import {
  Box,
  Select,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  TableCell,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
} from "@mui/material";
import Highcharts from "highcharts/highstock";
import {
  displayNumberTable,
  displayVolume,
  getIndexOfTableKey,
  timeConverter,
} from "../helper/helper";
import {
  SUB_INDEX_LIST,
  SYMBOL_LIST,
  TABLE_KEYS,
  TITLE_CONST,
} from "../helper/constants";
import * as mockDataDetail from "../mockData/detailId.json";

import Header from "./Header";

const Detail = () => {
  let { id } = useParams();
  const [subId, setSubId] = useState(null);
  const [subIndex, setSubIndex] = useState("close");
  const [information, setInformation] = useState([]);
  const [series, setSeries] = useState([]);

  const navigate = useNavigate();

  //use mock data
  let copyMockDataDetail = Object.create(null);
  copyMockDataDetail = { ...mockDataDetail };

  useEffect(() => {
    let curData = [];
    let curSeries = [];
    let curInformation = [];

    // fetch(`http://127.0.0.1:5000/info/${id}`)
    // .then(res => res.json())
    // .then(data => {
    // })

    //fixed data
    const data = copyMockDataDetail;

    if (subId === null || subIndex === null) {
      for (let i = 0; i < Object.keys(data["time"]).length; i++) {
        let newData = [
          data["time"][String(i)],
          data["open"][String(i)],
          data["high"][String(i)],
          data["low"][String(i)],
          data["close"][String(i)],
        ];
        curData.push(newData);
      }
      curSeries.push({
        type: "candlestick",
        name: `${id}`,
        data: curData.reverse(),
        dataGrouping: {
          enabled: true,
          units: [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      });
    }

    if (subIndex !== null) {
      let curSubData = [];
      for (let i = 0; i < Object.keys(data["time"]).length; i++) {
        let newData = [
          data["time"][String(i)],
          subIndex === "change"
            ? data[subIndex][String(i)] * 100
            : data[subIndex][String(i)],
        ];
        curSubData.push(newData);
      }

      curSeries.push({
        marker: {
          enabled: false,
        },
        color: "red",
        line: {
          lineWidth: 0.5,
        },
        type: subIndex === "volume" ? "column" : "line",
        yAxis: subIndex === "volume" || subIndex === "change" ? 1 : 0,
        name: TITLE_CONST[subIndex] + `of ${id}`,
        data: curSubData.reverse(),
      });
    }

    //Set information table
    for (let i = 0; i < 4; i++) {
      let newInformation = [];

      for (let keyInd = 0; keyInd < Object.keys(TABLE_KEYS).length; keyInd++) {
        newInformation.push(
          data[Object.values(TABLE_KEYS)[keyInd]]
            ? data[Object.values(TABLE_KEYS)[keyInd]][i]
            : null
        );
      }

      curInformation.push(newInformation);
      setInformation(curInformation);
    }

    let curData2 = [];
    if (subId !== null) {
      // fetch(`http://127.0.0.1:5000/info/${subId}`)
      // .then(res => res.json())
      // .then(data => {})
      for (let i = 0; i < Object.keys(data["time"]).length; i++) {
        let newData = [
          data["time"][String(i)],
          subIndex === "change"
            ? data[subIndex][String(i)] * 100
            : data[subIndex][String(i)],
        ];
        curData2.push(newData);
      }

      curSeries.push({
        marker: {
          enabled: false,
        },
        type: subIndex === "volume" ? "column" : "line",
        color: "green",
        line: {
          lineWidth: 0.5,
        },
        name: TITLE_CONST[subIndex] + `of ${subId}`,
        data: curData2.reverse(),
      });
      setSeries(curSeries);
    }
    if (subId == null || subIndex == null) setSeries(curSeries);
  }, [subId, subIndex]);

  const handleChangeSubId = (e) => {
    if (e.target.value !== id && subIndex !== null) setSubId(e.target.value);
  };

  const handleChangeSubIndex = (e) => {
    setSubIndex(e.target.value);
    if (e.target.value == null) setSubId(null);
  };

  const options = {
    rangeSelector: {
      enabled: true,
      selected: 1,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis:
      subIndex === "volume"
        ? [
            {
              labels: {
                align: "right",
                x: -3,
              },
              title: {
                text: "OHLC",
              },
              height: "60%",
              lineWidth: 2,
              resize: {
                enabled: true,
              },
            },
            {
              labels: {
                align: "right",
                x: -3,
              },
              title: {
                text: "Volume",
              },
              top: "65%",
              height: "35%",
              offset: 0,
              lineWidth: 2,
            },
          ]
        : {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "OHLC",
            },
            height: "100%",
            lineWidth: 2,
            resize: {
              enabled: true,
            },
          },
    title: {
      text: `${id} Stock Price`,
    },
    series: series,
  };

  return (
    <>
      <div>
        {" "}
        <Box
          sx={{
            minWidth: 120,
            padding: "20px 0",
            backgroundColor: "#fff",
            width: "90%",
            margin: "0 auto",
          }}
        >
          {" "}
          <a onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
            {" "}
            &lt;&lt; Go Back
          </a>
          <br />
          <br />
          <FormControl sx={{ marginLeft: "20px", width: "10%" }}>
            <InputLabel id="demo-simple-select-label">Sub Index</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subIndex}
              label="Sub Index"
              onChange={handleChangeSubIndex}
            >
              {SUB_INDEX_LIST.map((item) => (
                <MenuItem value={item.value}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10%", marginLeft: "20px" }}>
            <InputLabel id="demo-simple-select-label">Code</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subId}
              label="Index"
              onChange={handleChangeSubId}
            >
              <MenuItem value={null}>None</MenuItem>
              {SYMBOL_LIST.map((symbol) => {
                if (symbol !== subIndex) {
                  return <MenuItem value={symbol}>{symbol}</MenuItem>;
                }
              })}
            </Select>
          </FormControl>
        </Box>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <Paper
          elevation={3}
          sx={{ width: "100%", height: "200px", marginTop: "60px" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">High</TableCell>
                  <TableCell align="right">Low</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Change Percent</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">EMA</TableCell>
                  <TableCell align="right">RSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.map((row, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {timeConverter(
                          row[getIndexOfTableKey(TABLE_KEYS.TIME)],
                          false
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[getIndexOfTableKey(TABLE_KEYS.OPEN)]
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[getIndexOfTableKey(TABLE_KEYS.HIGH)]
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[getIndexOfTableKey(TABLE_KEYS.LOW)]
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[getIndexOfTableKey(TABLE_KEYS.CLOSE)]
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {row[getIndexOfTableKey(TABLE_KEYS.CHANGE)]
                          ? displayNumberTable(
                              row[getIndexOfTableKey(TABLE_KEYS.CHANGE)] * 100
                            )
                          : "--"}
                        %
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayVolume(
                          row[getIndexOfTableKey(TABLE_KEYS.VOLUME)],
                          0
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[Object.keys(TABLE_KEYS).indexOf("ema")]
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px" }}>
                        {displayNumberTable(
                          row[Object.keys(TABLE_KEYS).indexOf("rsi")]
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default Detail;
