using System.Text.Json.Serialization;
public class TypeEstimated
    {
        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("beds")]
        public int Beds { get; set; }

        [JsonPropertyName("bedType")]
        public string BedType { get; set; }
    }
