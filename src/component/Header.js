import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { INFO_NEWS_SELECTION } from "../helper/constants";

const Header = ({ value, setValue, isDetails }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#101828",
        display: "flex",
        paddingBottom: 4,
        paddingLeft: 5,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", flex: 1, marginTop: 3 }}
      >
        <ShowChartIcon sx={{ color: "white", marginRight: 1 }} />
      </Box>

      {!isDetails && (
        <Box sx={{ flex: 1, marginTop: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: "#FFFFCC",
                fontWeight: 500,
              },
            }}
          >
            <Tab
              sx={{ color: "white", textTransform: "none", padding: "0px" }}
              label="Thông tin"
              value={INFO_NEWS_SELECTION.INFO}
            />
            <Tab
              sx={{ color: "white", textTransform: "none" }}
              label="Tin tức"
              value={INFO_NEWS_SELECTION.NEWS}
            />
          </Tabs>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          justifyContent: "right",
          marginRight: 6,
        }}
      ></Box>
    </Box>
  );
};

export default Header;
