import { isAxiosError } from "axios";

const isAxiosErorrHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "An unexpected error occurred";
  }
};
export default isAxiosErorrHandler;
