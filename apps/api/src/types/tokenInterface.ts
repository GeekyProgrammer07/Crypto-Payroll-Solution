import { JwtPayload } from "jsonwebtoken";

export interface tokenInterface extends JwtPayload {
  sub: string;
  email: string;
  role: string;
  walletAddress?: string | null;
}

export interface refreshTokenInterface extends JwtPayload {
  id: string
}