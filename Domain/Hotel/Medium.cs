using System.Text.Json.Serialization;
public class Medium
    {
        [JsonPropertyName("uri")]
        public string Uri { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }
    }
