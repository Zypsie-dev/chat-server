import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "../api";
const defaultTheme = createTheme();

export default function SignUpSide() {
  const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  const [errors, setErrors] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validation logic
    let formIsValid = true;
    const newErrors: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate username
    if (!data.get("username")) {
      newErrors.username = "Username is required";
      formIsValid = false;
    }

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!data.get("email")) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!emailRegex.test(data.get("email") as string)) {
      newErrors.email = "Invalid email format";
      formIsValid = false;
    }

    // Validate password
    if (!data.get("password")) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if ((data.get("password") as string).length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      formIsValid = false;
    }

    // Validate confirmPassword
    if (!data.get("confirmPassword")) {
      newErrors.confirmPassword = "Confirm Password is required";
      formIsValid = false;
    } else if (data.get("password") !== data.get("confirmPassword")) {
      newErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log("Form submitted:",);
      console.log("Form data:", {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
      });
          try {
            const response = await registerUser(formData);
            alert("User registered successfully");
            navigate("/login");
            console.log("User register is successfully:", response);
          } catch (error) {
            console.error("Error registering user:", error);
          }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                onChange={handleChange}
                autoFocus
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <FormControlLabel
                control={<Checkbox value="agree" color="primary" />}
                label="I agree to the terms and conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
