using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class Datum
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("hotel")]
        public Hotel Hotel { get; set; }

        [JsonPropertyName("available")]
        public bool Available { get; set; }

        [JsonPropertyName("offers")]
        public List<Offer> Offers { get; set; }

        [JsonPropertyName("self")]
        public string Self { get; set; }
    }
