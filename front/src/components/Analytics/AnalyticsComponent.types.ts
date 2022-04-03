export interface analyticsState {
  error: string | null;
  data?: shortUrlAnalytics[];
}

export interface shortUrlAnalytics {
  createdAt: Date;
}
