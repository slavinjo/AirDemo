using System.Text.Json.Serialization;
public class RateFamilyEstimated
    {
        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
