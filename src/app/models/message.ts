import { MessageMethod, MessageTransport } from "./types";

export class Message
{
  private readonly payload: string;
  private readonly transport: MessageTransport;
  private readonly method: MessageMethod;
  private readonly address: string;

  public constructor(address: string, payload?: string, transport?: MessageTransport, method?: MessageMethod)
  {
    this.address = address;
    this.payload = payload;
    this.transport = transport;
    this.method = method;
  }

  public getPayload(): string
  {
    return this.payload;
  }

  public getTransport(): string
  {
    return this.transport;
  }

  public getMethod(): string
  {
    return this.method;
  }

  public getAddress(): string
  {
    return this.address;
  }
}
