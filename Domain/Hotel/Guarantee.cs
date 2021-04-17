using System.Text.Json.Serialization;
    public class Guarantee
    {
        [JsonPropertyName("acceptedPayments")]
        public AcceptedPayments AcceptedPayments { get; set; }
    }
