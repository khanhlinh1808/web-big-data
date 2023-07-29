import "./App.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getDataByKey } from "./helper/helper";
import background from "./img/pxfuel.jpg";
import * as mockDataNews from "./mockData/news.json";
import * as mockDataInfo from "./mockData/information.json";

import { INFO_NEWS_SELECTION } from "./helper/constants";
import Header from "./component/Header";
import News from "./component/News";
import Information from "./component/Information";

const SYMBOL_LIST = ["FPT", "SSI", "VIC", "STB"];

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
      for (const symbol of SYMBOL_LIST) {
        // fetch("./EIB.json")
        //   .then((res) => res.json())
        //   .then((data) => {

        //using mock data
        const data = copyMockInfoNewsObj;

        let symbol_price = [
          getDataByKey(data, "symbol"),
          getDataByKey(data, "close"),
        ];
        curPriceList.push(symbol_price);
        curPriceList.sort(function (a, b) {
          return b[1] - a[1];
        });
        setPriceList(curPriceList);

        let change_rate = [
          getDataByKey(data, "symbol"),
          getDataByKey(data, "change_percent"),
        ];
        curChangeRateList.push(change_rate);
        curChangeRateList.sort(function (a, b) {
          return b[1] - a[1];
        });
        setChangeRateList(curChangeRateList);

        let stock_information = [
          getDataByKey(data, "symbol"),
          getDataByKey(data, "open"),
          getDataByKey(data, "high"),
          getDataByKey(data, "low"),
          getDataByKey(data, "close"),
          getDataByKey(data, "volume"),
          getDataByKey(data, "change_percent"),
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
      // fetch("./EIB.json")
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
      <Box
        sx={{
          paddingTop: "10px",
          backgroundImage: `url(${background})`,
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
