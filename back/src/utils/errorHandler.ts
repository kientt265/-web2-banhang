interface CustomError extends Error {
  status?: number;
}

export default function createError(status: number, message: string): CustomError {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
}