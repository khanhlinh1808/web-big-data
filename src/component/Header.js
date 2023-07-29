import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { INFO_NEWS_SELECTION } from "../helper/constants";
import HelpIcon from "@mui/icons-material/Help";

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
      <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
        <ShowChartIcon sx={{ color: "white", marginRight: 1 }} />
        <Typography sx={{ color: "white", fontSize: 14 }}>
          StockDataPlatform
        </Typography>
      </Box>

      {!isDetails && (
        <Box sx={{ flex: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                color: "white",
              },
            }}
          >
            <Tab
              sx={{ color: "white", textTransform: "none", padding: "0px" }}
              label="Information"
              value={INFO_NEWS_SELECTION.INFO}
            />
            <Tab
              sx={{ color: "white", textTransform: "none" }}
              label="News"
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
      >
        <HelpIcon sx={{ color: "white", marginRight: 1 }} />
        <Typography sx={{ color: "white", fontSize: 14 }}>Guide</Typography>
      </Box>
    </Box>
  );
};

export default Header;
