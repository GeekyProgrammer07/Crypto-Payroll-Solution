import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ColorModeSelect from "../components/shared-theme/ColorModeSelect";
import AppTheme from "../components/shared-theme/AppTheme";

// Styled Card container
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

// Page background (gradient for light/dark)
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
  // Form state
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  // Error messages
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle role dropdown
  const handleRoleChange = (e: any) => {
    setForm({ ...form, role: e.target.value });
  };

  // Validate inputs
  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!form.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!form.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    // Replace this with your API call later
    console.log("Form submitted:", form);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {/* Dark/Light mode switcher */}
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Sign up
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Name */}
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Jon Snow"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>

            {/* Role Select */}
            <FormControl>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select
                id="role"
                name="role"
                value={form.role}
                onChange={handleRoleChange}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>

            {/* Submit */}
            <Button type="submit" variant="contained" fullWidth>
              Sign up
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          {/* Placeholder for navigation – you handle routing later */}
          <Typography sx={{ textAlign: "center" }}>
            Already have an account? (Add routing here)
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
