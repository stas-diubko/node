// export class AppError {
//   static badRequest(message?: string) {
//     return {
//       status: 400,
//       message: { error: message ?? "Bad request" },
//     };
//   }
//   static notFound(message?: string) {
//     return {
//       status: 404,
//       message: { error: message ?? "Not found" },
//     };
//   }
//   static unauthorised(message?: string) {
//     return {
//       status: 401,
//       message: { error: message ?? "Authorised" },
//     };
//   }
//   static serverError(message?: string) {
//     return {
//       status: 500,
//       message: { error: message ?? "Internal server error" },
//     };
//   }
// }

export class AppError extends Error {
  statusCode: number
  constructor(statusCode: number, message?: string) {
    super();
    this.statusCode = statusCode;
    this.message = message || "";
  }
}
