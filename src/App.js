import './App.css';
import React, {useState, useEffect} from 'react'
import { Box, Container, Paper, BottomNavigation, BottomNavigationAction, Typography, TableCell, Table, TableHead, TableContainer, TableRow, TableBody } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SYMBOL_LIST = [
  'AAPL',
  'MSFT',
  'GOOG',
  'TSLA',
  'AMZN',
]

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function App() {
  const [value, setValue] = useState('information');
  const [priceList, setPriceList] = useState([])
  const [changeRateList, setChangeRateList] = useState([])
  const [information, setInformation] = useState([])
  const [news, setNews] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let curPriceList = []
    let curChangeRateList = []
    let curInformation = []
    for(const symbol of SYMBOL_LIST) {
      fetch(`http://127.0.0.1:5000/realtime/${symbol}/20`)
      .then(res => res.json())
      .then(data => {
        let symbol_price = [
          data['symbol']['0'], data['close']['0']
        ]
        curPriceList.push(symbol_price)
        curPriceList.sort(function(a, b) {return b[1] - a[1]})
        setPriceList(curPriceList)

        let change_rate = [
          data['symbol']['0'], data['change_percent']['0']
        ]
        curChangeRateList.push(change_rate)
        curChangeRateList.sort(function(a, b) {return b[1] - a[1]})
        setChangeRateList(curChangeRateList)
        
        let stock_information = [
          data['symbol']['0'],
          data['open']['0'],
          data['high']['0'],
          data['low']['0'],
          data['close']['0'],
          data['volume']['0'],
          data['change_percent']['0']
        ]
        curInformation.push(stock_information)
        setInformation(curInformation)
      })
    }
  },  [])
  useEffect(() => {
    let curNews = []
    fetch(`http://127.0.0.1:5000/news`)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < Object.keys(data['title']).length; i ++) {
          let newItems = [
            data['title'][String(i)],
            data['img'][String(i)],
            data['source'][String(i)]
          ]
          curNews.push(newItems)
          setNews(curNews)
        }
      })
  }, [])


  return (
    <Box  sx={{backgroundColor: "#C0C0C0", paddingTop: "10px"}}>
      <BottomNavigation sx={{ width: 500, margin: "10px auto", border: "2px solid #C0C0C0", borderRadius: "10px" }} value={value} onChange={handleChange}>
        <BottomNavigationAction 
          label="Information"
          value="information" 
          icon={<FormatAlignJustifyIcon />} 
        />
        <BottomNavigationAction
          label="News"
          value="news"
          icon={<ArticleIcon />}
        />
      </BottomNavigation>
      {value == "information" ? <Container sx={{backgroundColor: "#C0C0C0", paddingTop: "20px", maxWidth:"700px", height: "550px"}}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Paper elevation={3} sx={{width: "37%", height: "120px", padding: "20px"}}>
            <strong>Top Value</strong>
            <Box sx={{paddingLeft:"15px", paddingTop: "10px"}}>
              {priceList.map(price => (
                <Typography variant="body2">{price[0]} : {price[1]}$</Typography>
              )) }
            </Box>
          </Paper>
          <Paper elevation={3} sx={{width: "37%", height: "120px", padding: "20px"}}>
            <strong>Top Change Rate</strong>
            <Box sx={{paddingLeft:"10px", paddingTop: "10px"}}>
              {changeRateList.map(changeRate => (
                <Typography variant="body2">{changeRate[1] >= 0 ? <ArrowUpwardIcon sx={{fontSize: "14px", color: "green", fontWeight: 600}}/> : <ArrowDownwardIcon sx={{fontSize: "14px", color: "red", fontWeight: 600}}/>} {changeRate[0]} : {changeRate[1]}% </Typography>
              )) }
            </Box>
          </Paper>
        </Box>
        <Paper elevation={3} sx={{width: "100%", height: "200px", marginTop: "60px"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">High</TableCell>
                  <TableCell align="right">Low</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Volumn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{fontSize: "12px", fontWeight: 600}}>
                      <a href={"/" + row[0]}>{row[0]}</a>
                    </TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{row[1]}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{row[2]}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{row[3]}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{row[4]}</TableCell>
                    <TableCell align="right" sx={{fontSize: "12px"}}>{row[5]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container> : <Container sx={{backgroundColor: "#C0C0C0", paddingTop: "20px", maxWidth:"700px", height: "450px"}}>
              {news.map((row) => (
                  <Paper elevation={3} sx={{padding: "10px", display: "flex", marginBottom: "20px"}}>
                    <img src={row[1]}></img>
                    <Typography variant="body1" sx={{fontWeight: 600, marginLeft: "10px"}}>{row[0]}</Typography>
                  </Paper>
                ))}
      </Container>}
    </Box>
  );
}

export default App;
