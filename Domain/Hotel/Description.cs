using System.Text.Json.Serialization;
public class Description
    {
        [JsonPropertyName("lang")]
        public string Lang { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
