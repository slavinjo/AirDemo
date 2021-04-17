using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class Links
    {
        [JsonPropertyName("next")]
        public string Next { get; set; }
    }
