import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme();

const WelcomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?chatting)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}>
            <Grid item xs={10} md={8} lg={6}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} textAlign="center">
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to ChatApp
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="center">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6} textAlign="center">
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default WelcomePage;
