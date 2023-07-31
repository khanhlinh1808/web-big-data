import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import { displayNumberTable, displayVolume } from "../helper/helper";
import "../App.css";

const Information = ({ priceList, changeRateList, information }) => {
  const topPriceList = priceList.length
    ? priceList?.sort((a, b) => b[1] - a[1]).slice(0, 4)
    : [];

  const topChangeRateList = changeRateList.length
    ? changeRateList?.sort((a, b) => b[1] - a[1]).slice(0, 4)
    : [];

  return (
    <Container
      sx={{
        paddingTop: "20px",
        maxWidth: "700px",
        height: "550px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            width: "40%",
            height: "120px",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon />
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              Top giá trị
            </Typography>
          </Box>
          <hr />
          <Box sx={{ paddingLeft: "15px", paddingTop: "10px" }}>
            {topPriceList.map((price, index) => (
              <Typography variant="body2" key={index}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: 35 }}>{price[0]}</div>:{" "}
                  {displayNumberTable(price[1])}$
                </div>
              </Typography>
            ))}
          </Box>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            width: "40%",
            height: "120px",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PercentIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", marginLeft: 1 }}
            >
              Top mã thay đổi
            </Typography>
          </Box>
          <hr />

          <Box sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
            {topChangeRateList.map((changeRate, index) => (
              <Typography variant="body2" key={index}>
                <div style={{ display: "flex" }}>
                  {changeRate[1] >= 0 ? (
                    <ArrowUpwardIcon
                      sx={{
                        fontSize: "14px",
                        color: "green",
                        fontWeight: 600,
                      }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        fontSize: "14px",
                        color: "red",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <div style={{ width: 35, marginLeft: 5 }}>
                    {" "}
                    {changeRate[0]}
                  </div>
                  : {displayNumberTable(changeRate[1])}%
                </div>
              </Typography>
            ))}
          </Box>
        </Paper>
      </Box>
      <InfoTable information={information} />
    </Container>
  );
};

const InfoTable = ({ information }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "200px",
        marginTop: "40px",
      }}
    >
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Mã cổ phiếu</TableCell>
              <TableCell align="right">Open</TableCell>
              <TableCell align="right">High</TableCell>
              <TableCell align="right">Low</TableCell>
              <TableCell align="right">Close</TableCell>
              <TableCell align="right">Volumn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {information.map((row, index) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                key={index}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "12px", fontWeight: 600 }}
                >
                  <a href={"/" + row[0]}>{row[0]}</a>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {displayNumberTable(row[1])}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {displayNumberTable(row[2])}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {displayNumberTable(row[3])}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {displayNumberTable(row[4])}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {displayVolume(row[5])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Information;
