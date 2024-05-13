import { Form, redirect, useLocation, useNavigation } from "react-router-dom";
import { authProvider } from "../data/authProvider";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";

export async function action({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  // Validate form inputs and return validation errors
  if (!email || !password) {
    return {
      error: "You must provide an credentials to log in",
    };
  }
  // Sign in and redirect to the proper destination if successful
  try {
    await authProvider.signin(email, password).then(() => {});
  } catch (error) {
    // Handle invalid username/password combinations
  }
  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/admin");
}

export async function loader() {
  if (authProvider.isAuthenticated) {
    return redirect("/admin");
  }
  return null;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
      light: "#E0E0E0",
    },
    secondary: {
      main: "#E0E0E0",
      light: "#E0E0E0",
    },
  },
});

function SignIn() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/admin";
  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3} sx={{ pb: 20 }}>
            <Canvas
              camera={{
                fov: 45,
                near: 0.1,
                far: 75,
                position: [20, 10, 0],
              }}
            >
              <OrbitControls autoRotate />
              <ambientLight />
              <directionalLight intensity={3} />

              <mesh visible={true} position={[0, 0, 0]} scale={0.75}>
                <sphereGeometry
                  args={[6, 64, 64, 0, Math.PI * 2, 0, Math.PI]}
                />
                <MeshDistortMaterial
                  distort={0.4}
                  speed={0}
                  color="#aaaaaa"
                  depthTest={false}
                  flatShading={true}
                />
              </mesh>
            </Canvas>
            <Box sx={{ mt: 0 }}>
              <Form method="post" replace>
                <input type="hidden" name="redirectTo" value={from} />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  color="primary"
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  color="primary"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1, mb: 2 }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default function LoginPage() {
  document.body.style.backgroundColor = "rgb(235, 235, 235)";
  return <SignIn />;
}
