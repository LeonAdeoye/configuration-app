import { MessageMethod, MessageTransport } from "./types";

export class Message
{
  private readonly message: string;
  private readonly transport: MessageTransport;
  private readonly method: MessageMethod;
  private readonly address: string;

  constructor(address: string, message: string, transport?: MessageTransport, method?: MessageMethod)
  {
    this.address = address;
    this.message = message;
    this.transport = transport;
    this.method = method;
  }

  getMessage(): string
  {
    return this.message;
  }

  getTransport(): string
  {
    return this.transport;
  }

  getMethod(): string
  {
    return this.method;
  }

  getAddress(): string
  {
    return this.address;
  }
}
