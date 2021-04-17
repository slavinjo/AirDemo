using System;
using System.Text.Json.Serialization;
public class Cancellation
    {
        [JsonPropertyName("deadline")]
        public DateTime Deadline { get; set; }
    }
