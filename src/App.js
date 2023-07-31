import "./App.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getDataByKey, getDataInfoByKey } from "./helper/helper";
import * as mockDataNews from "./mockData/news.json";
import * as mockDataInfo from "./mockData/information.json";

import { INFO_NEWS_SELECTION } from "./helper/constants";
import Header from "./component/Header";
import News from "./component/News";
import Information from "./component/Information";

const SYMBOL_LIST = ["VIC", "KDC", "SSI", "FPT", "HAG", "MSN", "STB"];

function App() {
  const [value, setValue] = useState(INFO_NEWS_SELECTION.INFO);
  const [priceList, setPriceList] = useState([]);
  const [changeRateList, setChangeRateList] = useState([]);
  const [information, setInformation] = useState([]);
  const [news, setNews] = useState([]);

  //use mock data
  let copyMockNewsObj = Object.create(null);
  copyMockNewsObj = { ...mockDataNews };

  let copyMockInfoNewsObj = Object.create(null);
  copyMockInfoNewsObj = { ...mockDataInfo };

  useEffect(() => {
    if (value === INFO_NEWS_SELECTION.INFO) {
      let curPriceList = [];
      let curChangeRateList = [];
      let curInformation = [];
      for (const [index, symbol] of SYMBOL_LIST.entries()) {
        // fetch("http://127.0.0.1:5000/realtime/"+symbol+"/20")
        //   .then((res) => res.json())
        //   .then((data) => {
        //using mock data
        const data = copyMockInfoNewsObj;
        let symbol_price = [
          getDataInfoByKey(data, "symbol", index),
          getDataInfoByKey(data, "close", index),
        ];
        curPriceList.push(symbol_price);
        curPriceList.sort(function (a, b) {
          return b[1] - a[1];
        });
        setPriceList(curPriceList);

        let change_rate = [
          getDataInfoByKey(data, "symbol", index),
          (getDataInfoByKey(data, "high", index) -
            getDataInfoByKey(data, "low", index)) /
            getDataInfoByKey(data, "high", index),
        ];
        curChangeRateList.push(change_rate);
        curChangeRateList.sort(function (a, b) {
          return b[1] - a[1];
        });
        setChangeRateList(curChangeRateList);

        let stock_information = [
          getDataInfoByKey(data, "symbol", index),
          getDataInfoByKey(data, "open", index),
          getDataInfoByKey(data, "high", index),
          getDataInfoByKey(data, "low", index),
          getDataInfoByKey(data, "close", index),
          getDataInfoByKey(data, "volume", index),
        ];

        curInformation.push(stock_information);
        setInformation(curInformation);
      }

      // );
      // }
    }
  }, [value]);

  useEffect(() => {
    if (value === INFO_NEWS_SELECTION.NEWS) {
      const data = copyMockNewsObj;
      let curNews = [];
      // fetch("http://127.0.0.1:5000/news")
      //   .then((res) => res.json())
      //   .then((data) => {
      for (let i = 0; i < Object.keys(data["title"]).length; i++) {
        let newItems = [
          getDataByKey(data, "title", true, i),
          getDataByKey(data, "img", true, i),
          getDataByKey(data, "source", true, i),
          getDataByKey(data, "time", true, i),
        ];
        curNews.push(newItems);
        setNews(curNews);
      }
      // }
      // );
    }
  }, [value]);

  return (
    <>
      <Header value={value} setValue={setValue} />
      <h2 style={{ textAlign: "center" }}>
        Nền tảng tra cứu thông tin thị trường
      </h2>
      <Box
        sx={{
          paddingTop: "10px",
        }}
      >
        {value === INFO_NEWS_SELECTION.INFO ? (
          <Information
            priceList={priceList}
            changeRateList={changeRateList}
            information={information}
          />
        ) : (
          <News news={news} />
        )}
      </Box>
    </>
  );
}

export default App;
