using System.Text.Json.Serialization;
public class Meta
    {
        [JsonPropertyName("links")]
        public Links Links { get; set; }
    }
