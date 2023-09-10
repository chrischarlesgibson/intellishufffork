export type JwtPayload = {
  userId: number;
  email: string;
};
export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
