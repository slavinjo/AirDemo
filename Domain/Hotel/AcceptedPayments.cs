using System.Collections.Generic;
using System.Text.Json.Serialization;
    public class AcceptedPayments
    {
        [JsonPropertyName("creditCards")]
        public List<string> CreditCards { get; set; }

        [JsonPropertyName("methods")]
        public List<string> Methods { get; set; }
    }
