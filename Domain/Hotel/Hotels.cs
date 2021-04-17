using System.Collections.Generic;
using System.Text.Json.Serialization;
public class Hotels
{
    [JsonPropertyName("data")]
    public List<Datum> Data { get; set; }

    [JsonPropertyName("meta")]
    public Meta Meta { get; set; }
}
