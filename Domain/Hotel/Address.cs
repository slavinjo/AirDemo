using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class Address
    {
        [JsonPropertyName("lines")]
        public List<string> Lines { get; set; }

        [JsonPropertyName("postalCode")]
        public string PostalCode { get; set; }

        [JsonPropertyName("cityName")]
        public string CityName { get; set; }

        [JsonPropertyName("countryCode")]
        public string CountryCode { get; set; }
    }
