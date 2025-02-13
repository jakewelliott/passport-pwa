import { decodeJwt } from "jose";

export const decodeToken = (token: string) => {
    const decoded = decodeJwt(token)
    return {
      id: decoded.sub,
      username: decoded.unique_name,
      role: decoded.role,
    };
  };