using System.Text.Json.Serialization;
public class Commission
    {
        [JsonPropertyName("amount")]
        public string Amount { get; set; }

        [JsonPropertyName("percentage")]
        public string Percentage { get; set; }
    }
