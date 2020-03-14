import { JsonConvert, JsonObject, JsonProperty, ValueCheckingMode } from "json2typescript";

@JsonObject
export class Configuration
{
  @JsonProperty("id", String)
  private _id: string;

  @JsonProperty("owner", String)
  private _owner: string;

  @JsonProperty("key", String)
  private _key: string;

  @JsonProperty("value", String)
  private _value: string;

  public constructor(owner?: string, key?:string, value?: string, id?: string)
  {
    this._owner = owner;
    this._key = key;
    this._value = value;
    this._id = id;
  }

  public get id(): string
  {
    return this._id;
  }

  public set id(value: string)
  {
    this._id = value;
  }

  public get owner(): string
  {
    return this._owner;
  }

  public set owner(value: string)
  {
    this._owner = value;
  }

  public get key(): string
  {
    return this._key;
  }

  public set key(value: string)
  {
    this._key = value;
  }

  public get value(): string
  {
    return this._value;
  }

  public set value(value: string)
  {
    this._value = value;
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

  public static deserializeArray(jsonObjectArray: any): Array<Configuration>
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
