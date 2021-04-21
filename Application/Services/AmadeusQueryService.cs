using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Core;
using Application.Utils;
using Microsoft.Extensions.Configuration;
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

        public AmadeusQueryService(HttpClient httpClient, IAmadeusTokenService tokenService, IConfiguration config)
        {
            _config = config;
            _tokenService = tokenService;
            _httpClient = httpClient;
        }

        public async Task<Result<Hotels>> GetHotelsCall(Query request)
        {
            AmadeusToken token = await _tokenService.GetToken();
            Hotels hotelsList = new Hotels();

            _httpClient.DefaultRequestHeaders.Authorization
                     = new AuthenticationHeaderValue("Bearer", token.access_token);
            using (var response = await _httpClient.GetAsync(_config.GetConnectionString("AmadeusAPIUrl")+request.param.ToQueryString()))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                hotelsList = JsonConvert.DeserializeObject<Hotels>(apiResponse);
            }

            return Result<Hotels>.Success(hotelsList);
        }
    }
}