using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Core;
using Application.Utils;
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

        public AmadeusQueryService(HttpClient httpClient, IAmadeusTokenService tokenService)
        {
            _tokenService = tokenService;
            _httpClient = httpClient;
        }

        public async Task<Result<Hotels>> GetHotelsCall(Query request)
        {
            AmadeusToken token = await _tokenService.GetToken();
            Hotels hotelsList = new Hotels();

            _httpClient.DefaultRequestHeaders.Authorization
                     = new AuthenticationHeaderValue("Bearer", token.access_token);
            using (var response = await _httpClient.GetAsync("https://test.api.amadeus.com/v2/shopping/hotel-offers" + request.param.ToQueryString()))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                hotelsList = JsonConvert.DeserializeObject<Hotels>(apiResponse);
            }

            return Result<Hotels>.Success(hotelsList);
        }
    }
}