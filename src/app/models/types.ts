export enum LogLevel
{
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5
}

export enum MessageMethod
{
  WEB_SOCKET = "webSocket",
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put"
}

export enum MessageTransport
{
  HTTP = "Http",
  HTTPS = "Https",
  WEB_SOCKET = "WebSocket"
}
