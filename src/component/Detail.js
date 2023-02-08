import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import HighchartsReact from 'highcharts-react-official';
import { Box, Select, Paper, InputLabel, MenuItem, FormControl, TableCell, Table, TableHead, TableContainer, TableRow, TableBody } from '@mui/material';
import Highcharts from 'highcharts/highstock'
import BigNumber from 'bignumber.js';


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp - 3600000*7);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year ;
  return time;
}

const SYMBOL_LIST = [
  "STB", "VIC", "SSI", "MSN", "FPT", "HAG", "KDC", "EIB", "DPM", "VNM",
]

const titleConst = {
  "close": "Close price of ",
  "open": "Open price of ",
  "high": "High price of ",
  "low": "Low price of ",
  "change": "Change percent of ",
  "volume": "Volume of ",
  "ema": "EMA of ",
  "rsi": "RSI of ",
}

const yAxisConst = {
  "close": "Price",
  "open": "Price",
  "high": "Price",
  "low": "Price",
  "change": "Percent",
  "volume": "Volume",
  "ema": "Price",
  "rsi": "RSI",
}

const Detail = () => {
  let {id} = useParams();
  const [subId, setSubId] = useState(null)
  const [subIndex, setSubIndex] = useState('close')
  const [information, setInformation] = useState([])
  const [series, setSeries] = useState([]);

  useEffect(() => {
    let curData = []
    let curSeries = []
    let curInformation = []
    fetch(`http://127.0.0.1:5000/info/${id}`)
      .then(res => res.json())
      .then(data => {
        if(subId === null || subIndex === null) {
          for (let i = 0; i < Object.keys(data['time']).length; i ++) {
            let newData = [
              data['time'][String(i)],
              data['open'][String(i)],
              data['high'][String(i)],
              data['low'][String(i)],
              data['close'][String(i)]
            ]
            curData.push(newData)
          }
          console.log(curData)
          curSeries.push({
            type: 'candlestick',
            name: `${id}`,
            data: curData.reverse(),
            dataGrouping: {
              enabled: true,
              units: [
                [
                  'week', // unit name
                  [1] // allowed multiples
                ], [
                  'month',
                  [1, 2, 3, 4, 6]
                ]
              ]
              }
          })}

        if(subIndex !== null) {
          let curSubData = []
          for (let i = 0; i < Object.keys(data['time']).length; i ++) {
            let newData = [
              data['time'][String(i)],
              subIndex == "change" ? data[subIndex][String(i)]*100 : data[subIndex][String(i)]
            ]
            curSubData.push(newData)
          }
          curSeries.push({
            marker:{
              enabled:false
            },
            color: "red",
            line: {
              lineWidth: 0.5
            },
            type: subIndex === "volume" ? "column" : "line",
            yAxis: subIndex === "volume" || subIndex === "change" ? 1 : 0,
            name: titleConst[subIndex] + `of ${id}`,
            data: curSubData.reverse(),
          })
        
        }
        for (let i = 0; i < 4; i ++) {
          let newInformation = [
            data['time'][String(i)],
            data['open'][String(i)],
            data['high'][String(i)],
            data['low'][String(i)],
            data['close'][String(i)],
            data['change'][String(i)],
            data['volume'][String(i)],
            data['ema'][String(i)],
            data['rsi'][String(i)],
          ]
          curInformation.push(newInformation)
          setInformation(curInformation)
        }
        
        let curData2 = []
        if(subId !== null) {
          fetch(`http://127.0.0.1:5000/info/${subId}`)
          .then(res => res.json())
          .then(data => {
            for (let i = 0; i < Object.keys(data['time']).length; i ++) {
              let newData = [
                data['time'][String(i)],
                subIndex == "change" ? data[subIndex][String(i)]*100 : data[subIndex][String(i)]
              ]
              curData2.push(newData)
            }
            curSeries.push({
              marker:{
                enabled:false
              },
              type: subIndex === "volume" ? "column" : "line",
              color: "green",
              line: {
                lineWidth: 0.5
              },
              name: titleConst[subIndex] + `of ${subId}`,
              data: curData2.reverse(),
            })
            setSeries(curSeries)
          })
        }
        if(subId == null || subIndex == null) setSeries(curSeries)
      })
  }, [subId, subIndex])

  const handleChangeSubId = (e) => {
    if(e.target.value !== id  && subIndex !== null) 
      setSubId(e.target.value)
  }

  const handleChangeSubIndex = (e) => {
    setSubIndex(e.target.value)
    if(e.target.value == null)
      setSubId(null)
  }


  const options = {
    rangeSelector: {
        enabled: true,
        selected: 1
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: subIndex === "volume" ? [{
      labels: {
          align: 'right',
          x: -3
      },
      title: {
          text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
          enabled: true
      }
  }, {
      labels: {
          align: 'right',
          x: -3
      },
      title: {
          text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
  }] : {
      labels: {
          align: 'right',
          x: -3
      },
      title: {
          text: 'OHLC'
      },
      height: '100%',
      lineWidth: 2,
      resize: {
          enabled: true
      }
  },
    title: {
        text: `${id} Stock Price`
    },
    series: series
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, marginBottom: "10px" }}>
        <FormControl sx={{ marginLeft: "20px", width: "10%"}}>
          <InputLabel id="demo-simple-select-label">Sub Index</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subIndex}
            label="Sub Index"
            onChange={handleChangeSubIndex}
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="volume">Volume</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="close">Close</MenuItem>
            <MenuItem value="change">Change</MenuItem>
            <MenuItem value="ema">EMA</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: "10%", marginLeft: "20px"}}>
          <InputLabel id="demo-simple-select-label">Code</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subId}
            label="Index"
            onChange={handleChangeSubId}
          >
            <MenuItem value={null}>None</MenuItem>
            {SYMBOL_LIST.map(symbol => {
              if(symbol !== subIndex){
                return (<MenuItem value={symbol}>{symbol}</MenuItem>)
              }
            })}
          </Select>
        </FormControl>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Paper elevation={3} sx={{width: "100%", height: "200px", marginTop: "60px"}}>
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
                {information.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{fontSize: "12px", fontWeight: 600}}>
                      {timeConverter(row[0])}
                    </TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[1]).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[2]).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[3]).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[4]).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[5]*100).toFixed(2)}%</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[6]).toFixed(0)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[7]).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{BigNumber(row[8]).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </div>
  )
}

export default Detail