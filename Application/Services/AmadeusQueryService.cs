using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Core;
using Application.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static Application.HotelsHandler.HotelsList;

namespace Application.Services
{
    public interface IAmadeusQueryService
    {
        Task<Result<Hotels>> GetHotelsCall(Query request);
    }
    public class AmadeusQueryService : IAmadeusQueryService
    {
        private readonly HttpClient _httpClient;
        private readonly IAmadeusTokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly ILogger<AmadeusQueryService> _logger;

        public AmadeusQueryService(HttpClient httpClient, IAmadeusTokenService tokenService, IConfiguration config, ILogger<AmadeusQueryService> logger)
        {
            _logger = logger;
            _config = config;
            _tokenService = tokenService;
            _httpClient = httpClient;
        }

        public async Task<Result<Hotels>> GetHotelsCall(Query request)
        {
            Hotels hotelsList = new Hotels();

            try
            {
                AmadeusToken token = await _tokenService.GetToken();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
                using (var response = await _httpClient.GetAsync(_config.GetConnectionString("AmadeusAPIUrl") + request.param.ToQueryString()))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    hotelsList = JsonConvert.DeserializeObject<Hotels>(apiResponse);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting data from Amadeus API", e.Message);
                throw e;
            }

            return Result<Hotels>.Success(hotelsList);
        }
    }
}