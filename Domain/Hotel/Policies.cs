using System.Text.Json.Serialization;
public class Policies
    {
        [JsonPropertyName("holdTime")]
        public HoldTime HoldTime { get; set; }

        [JsonPropertyName("guarantee")]
        public Guarantee Guarantee { get; set; }

        [JsonPropertyName("paymentType")]
        public string PaymentType { get; set; }

        [JsonPropertyName("cancellation")]
        public Cancellation Cancellation { get; set; }
    }
