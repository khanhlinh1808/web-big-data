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

const Information = ({ priceList, changeRateList, information }) => {
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
            backgroundColor: "#10181E",
            color: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon />
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              Top Value
            </Typography>
          </Box>
          <hr />
          <Box sx={{ paddingLeft: "15px", paddingTop: "10px" }}>
            {priceList.map((price, index) => (
              <Typography variant="body2" key={index}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: 35 }}>{price[0]}</div>: {price[1]}$
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
            backgroundColor: "#10181E",
            color: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PercentIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", marginLeft: 1 }}
            >
              Top Change Rate
            </Typography>
          </Box>
          <hr />

          <Box sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
            {changeRateList.map((changeRate, index) => (
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
                  : {changeRate[1]}%
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
            backgroundColor: "#10181E",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Symbol</TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                Open
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                High
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                Low
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                Close
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                Volumn
              </TableCell>
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
                  <a href={"/" + row[0]} style={{ color: "#fff" }}>
                    {row[0]}
                  </a>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "12px", color: "#fff" }}
                >
                  {row[1]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "12px", color: "#fff" }}
                >
                  {row[2]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "12px", color: "#fff" }}
                >
                  {row[3]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "12px", color: "#fff" }}
                >
                  {row[4]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "12px", color: "#fff" }}
                >
                  {row[5]}
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
