import { IUser } from "../user.model";

export type JwtPayload = {
  user: IUser
};
export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
