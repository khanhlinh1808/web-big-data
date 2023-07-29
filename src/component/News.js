import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { timeConverter } from "../helper/helper";

const News = ({ news }) => {
  return (
    <Container
      sx={{
        paddingTop: "20px",
        maxWidth: "700px",
        height: "500px",
      }}
    >
      <Grid container spacing={2}>
        {news.map((row, index) => {
          return (
            <Grid item xs={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: "10px",
                  display: "flex",
                  marginBottom: "20px",
                  maxWidth: "500px",
                  width: "90%",
                  height: "90%",
                  maxHeight: "410px",
                  backgroundColor: "#10181E",
                }}
              >
                <div style={{ cursor: "pointer" }}>
                  <img src={row[1]} alt="img" />
                </div>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, marginLeft: "10px" }}
                  >
                    <a href={row[2]} style={{ color: "#fff" }}>
                      {row[0]}
                    </a>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginLeft: "10px",
                      marginTop: "20px",
                      color: "#fff",
                    }}
                  >
                    {timeConverter(row[3], true)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default News;
