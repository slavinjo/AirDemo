using System.Text.Json.Serialization;
public class Offer
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("checkInDate")]
        public string CheckInDate { get; set; }

        [JsonPropertyName("checkOutDate")]
        public string CheckOutDate { get; set; }

        [JsonPropertyName("rateCode")]
        public string RateCode { get; set; }

        [JsonPropertyName("commission")]
        public Commission Commission { get; set; }

        [JsonPropertyName("room")]
        public Room Room { get; set; }

        [JsonPropertyName("guests")]
        public Guests Guests { get; set; }

        [JsonPropertyName("price")]
        public Price Price { get; set; }

        [JsonPropertyName("policies")]
        public Policies Policies { get; set; }

        [JsonPropertyName("rateFamilyEstimated")]
        public RateFamilyEstimated RateFamilyEstimated { get; set; }
    }
