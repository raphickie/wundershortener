import { object, string } from "yup";
export default object({
  params: object({
    shortUrlId: string()
      .required("shortUrl is required")
      .length(24, "shortUrlId should contain 24 characters"),
  }),
});
