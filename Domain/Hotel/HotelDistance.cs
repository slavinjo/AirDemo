using System.Text.Json.Serialization;
public class HotelDistance
    {
        [JsonPropertyName("distance")]
        public double Distance { get; set; }

        [JsonPropertyName("distanceUnit")]
        public string DistanceUnit { get; set; }
    }
