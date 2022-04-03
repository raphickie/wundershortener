export interface UrlShortenerFormState {
  destination: string;
  response: UrlShortenerResponse;
  errorMessage: string | null;
}

export interface UrlShortenerResponse {
  destination: string;
  shortId: string;
  _id: string;
}
