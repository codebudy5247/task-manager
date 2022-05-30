import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  TextField,
  Fab,
  IconButton,
  InputAdornment,
  Alert,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Api from "../API";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    let email_id = email;
    let Password = password;
    const [loginError, loginResponse] = await Api.signIn(email_id, Password);
    if (loginResponse) {
      localStorage.setItem("UserName", loginResponse?.data?.oldUser?.Name);
      localStorage.setItem("UserEmail", loginResponse?.data?.oldUser?.Email_id);
      localStorage.setItem("UserRole", loginResponse?.data?.oldUser?.Role);
      navigate("/")
    }
  };
  return (
    <Grid container alignItems="center" direction="column">
      <Card
        sx={{
          p: 3,
          mt: 20,
          // boxShadow:5,
          width: "30%",
          border: "1px solid white",
          borderRadius: "1%",
        }}
      >
        <Grid container alignItems="center" direction="column">
          <Fab color="primary" size="large">
            <LockOutlinedIcon fontSize="large" />
          </Fab>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Sign In
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
            }}
          >
            <TextField
              label="Email"
              id="email"
              variant="outlined"
              onChange={onChangeEmail}
            />
            <TextField
              label="Password"
              id="password"
              onChange={onChangePassword}
            />
          </Box>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Card>
    </Grid>
  );
};

export default Login;
