using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        IAmadeusTokenService _tokenService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IAmadeusTokenService tokenService)
        {
            _logger = logger;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            AmadeusToken token = await _tokenService.GetToken();

            Hotels reservationList = new Hotels();
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization
                         = new AuthenticationHeaderValue("Bearer", token.access_token);
                using (var response = await httpClient.GetAsync("https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    reservationList = JsonConvert.DeserializeObject<Hotels>(apiResponse);
                }
            }
            return Ok(reservationList.Data[0].Hotel.Address);

        }
    }
}
