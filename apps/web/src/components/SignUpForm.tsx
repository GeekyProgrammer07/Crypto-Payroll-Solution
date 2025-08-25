import {
  Box,
  Button,
  FormLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useSignUpForm } from "../hooks/useSignUpForm";

export default function SignUpForm() {
  const { form, errors, handleChange, handleRoleChange, handleSubmit } =
    useSignUpForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }} 
    >
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

      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="role">Role</FormLabel>
        <Select id="role" name="role" value={form.role} onChange={handleRoleChange}>
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" fullWidth>
        Sign up
      </Button>
    </Box>
  );
}
