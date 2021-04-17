using System.Text.Json.Serialization;
public class Room
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("typeEstimated")]
        public TypeEstimated TypeEstimated { get; set; }

        [JsonPropertyName("description")]
        public Description Description { get; set; }
    }
