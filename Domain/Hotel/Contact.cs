using System.Text.Json.Serialization;
public class Contact
    {
        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("fax")]
        public string Fax { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
