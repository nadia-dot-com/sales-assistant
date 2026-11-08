export interface CommerceToolsToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface CommerceToolsTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RegisterCustomerPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SessionUser {
  ctCustomerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SessionData {
  user: SessionUser;
  ct: CommerceToolsToken;
  issuedAt: number;
}
