using System;
using System.Text.Json.Serialization;
public class HoldTime
    {
        [JsonPropertyName("deadline")]
        public DateTime Deadline { get; set; }
    }
