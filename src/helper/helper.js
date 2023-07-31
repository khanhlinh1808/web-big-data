import BigNumber from "bignumber.js";
import { TABLE_KEYS } from "./constants";

const EMPTY_VALUE = "--";

export const checkNullValue = (val) => {
  return val || null;
};

export const displayNumberTable = (val, numberToFixed = 2) => {
  if (val === undefined || val === null) {
    return EMPTY_VALUE;
  }

  return BigNumber(val).toFixed(numberToFixed);
};

export const displayVolume = (val) => {
  if (val === undefined || val === null) {
    return EMPTY_VALUE;
  }

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getDataByKey = (data, key, isNews = false, indexOfNewsItem) => {
  if (isNews) {
    return data[key] ? data[key][String(indexOfNewsItem)] : null;
  }

  return data[key] ? data[key]["0"] : null;
};

export const getDataInfoByKey = (data, key, index) => {
  return data[key] ? data[key][String(index)] : null;
};

export const getIndexOfTableKey = (key) => {
  return Object.values(TABLE_KEYS).indexOf(key);
};

export const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const convertNormalDateToUNIX = (date) => {
  if (!date) {
    return 0;
  }

  const dateParts = date.split("/");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  return Math.floor(dateObject.getTime() / 1000);
};

export const timeConverter = (UNIX_timestamp, isHourMinIncluded) => {
  if (!UNIX_timestamp) {
    return EMPTY_VALUE;
  }

  var a = new Date(UNIX_timestamp - 3600000 * 7);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();

  var time = date + " " + month + " " + year;
  var timeHourMinIncluded =
    date + " " + month + " " + year + " " + hour + ":" + min;

  return isHourMinIncluded ? timeHourMinIncluded : time;
};
