import {
  CssBaseline,
  Divider,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ColorModeSelect from "../components/shared-theme/ColorModeSelect";
import AppTheme from "../components/shared-theme/AppTheme";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignUp() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="elevation">
          <Typography component="h1" variant="h2" sx={{ textAlign: "center", mb: 2 }}>
            Sign up
          </Typography>

          <SignUpForm />

          <Divider sx={{ my: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign in
            </Link>
          </Typography>

        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
