import { JsonConvert, JsonObject, JsonProperty, ValueCheckingMode } from "json2typescript";

@JsonObject
export class Configuration
{
  @JsonProperty("id", String)
  private readonly id: string;

  @JsonProperty("owner", String)
  private readonly owner: string;

  @JsonProperty("key", String)
  private readonly key: string;

  @JsonProperty("value", String)
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

  public static deserialize(jsonObject: any): Configuration
  {
    try
    {
      let jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeObject(jsonObject, Configuration);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing object: ${JSON.stringify(jsonObject)}`);
    }
  }

  public static deserializeArray(jsonObjectArray: any[]): Array<Configuration>
  {
    try
    {
      let jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeArray(jsonObjectArray, Configuration);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing array: ${JSON.stringify(jsonObjectArray)}`);
    }
  }
}
