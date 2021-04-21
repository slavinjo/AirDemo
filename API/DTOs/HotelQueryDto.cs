namespace API.DTOs
{
    public class HotelQueryDto
    {
        public string CityCode { get; set; }

        public string CheckInDate { get; set; }

        public string CheckOutDate { get; set; }

        public int Adults { get; set; }
    }
}