export type JwtPayload = {
  userId: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
