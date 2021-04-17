using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class Variations
    {
        [JsonPropertyName("changes")]
        public List<Change> Changes { get; set; }

        [JsonPropertyName("average")]
        public Average Average { get; set; }
    }
