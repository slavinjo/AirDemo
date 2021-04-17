using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class Hotel
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("hotelId")]
        public string HotelId { get; set; }

        [JsonPropertyName("chainCode")]
        public string ChainCode { get; set; }

        [JsonPropertyName("dupeId")]
        public string DupeId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("rating")]
        public string Rating { get; set; }

        [JsonPropertyName("cityCode")]
        public string CityCode { get; set; }

        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }

        [JsonPropertyName("hotelDistance")]
        public HotelDistance HotelDistance { get; set; }

        [JsonPropertyName("address")]
        public Address Address { get; set; }

        [JsonPropertyName("contact")]
        public Contact Contact { get; set; }

        [JsonPropertyName("amenities")]
        public List<string> Amenities { get; set; }

        [JsonPropertyName("description")]
        public Description Description { get; set; }

        [JsonPropertyName("media")]
        public List<Medium> Media { get; set; }
    }
