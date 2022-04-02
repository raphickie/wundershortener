export interface UrlShortenerFormState {
  destination: string;
  response: UrlShortenerResponse;
}

export interface UrlShortenerResponse {
  destination: string;
  shortId: string;
  _id: string;
}
