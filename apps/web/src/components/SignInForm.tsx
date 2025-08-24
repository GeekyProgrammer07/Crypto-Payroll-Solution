import {
    Box,
    Button,
    FormLabel,
    FormControl,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
import { useSignInForm } from "../hooks/useSignInForm"

export default function SignInForm() {
    const { form, errors, handleChange, handleSubmit } =
        useSignInForm();

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

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me(Add backend logic for remeber me)"
            />

            <Button type="submit" variant="contained" fullWidth>
                Sign In
            </Button>

            {/*Add Forgot Password Here*/}
            {/* <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography> */}
            <Typography>
                (Add Forgot Password Here)
            </Typography>
        </Box>
    );
}
