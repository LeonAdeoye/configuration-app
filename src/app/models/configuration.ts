export class Configuration
{
  private readonly id: string;
  private readonly owner: string;
  private readonly key: string;
  private value: string;

  constructor(owner?: string, key?:string, value?: string, id?: string)
  {
    this.owner = owner;
    this.key = key;
    this.value = value;
    this.id = id;
  }

  getId(): string
  {
    return this.id;
  }

  getOwner(): string
  {
    return this.owner;
  }

  getKey(): string
  {
    return this.key;
  }

  getValue(): string
  {
    return this.value;
  }

  setValue(value: string): void
  {
    this.value = value;
  }
}
