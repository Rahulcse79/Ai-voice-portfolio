export type OtpRecord = {
  otp: string;
  expiresAt: number;
};

declare global {
  var __otpStore: Map<string, OtpRecord> | undefined;
}

export const otpStore: Map<string, OtpRecord> =
  globalThis.__otpStore ?? new Map<string, OtpRecord>();

globalThis.__otpStore = otpStore;
