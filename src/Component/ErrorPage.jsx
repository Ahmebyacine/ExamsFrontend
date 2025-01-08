const ErrorPage = ({ error  }) => {
const errorMessages  = {
     400: "Bad Request" ,
     401: "Unauthorized",
     403: "Forbidden",
     404: "Not Found",
     405: "Method Not Allowed",
     408: "Request Timeout",
     409: "Conflict",
     500: "Internal Server Error",
     501: "Not Implemented",
     502: "Bad Gateway",
     503: "Service Unavailable",
     504: "Gateway Timeout",
     505: "HTTP Version Not Supported",
};
    const message = errorMessages[error.status] || "Unknown Error";
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 text-center">
      <h1 className="text-9xl font-bold mb-2 leading-none tracking-tight">
        {error?.status || 500}
      </h1>
      <h2 className="text-2xl font-normal mb-4 uppercase tracking-widest">
        {message}
      </h2>
      <p className="text-base text-gray-600">
        {error.message}
      </p>
    </div>
  )
}

export default ErrorPage;