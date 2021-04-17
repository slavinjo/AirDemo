using System.Text.Json.Serialization;
public class Guests
    {
        [JsonPropertyName("adults")]
        public int Adults { get; set; }
    }
