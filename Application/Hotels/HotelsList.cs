
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using Application.Utils;
using MediatR;
using Newtonsoft.Json;

namespace Application.HotelsHandler
{
    public class HotelsList
    {
        public class Query : IRequest<Hotels>
        {

        }

        public class Handler : IRequestHandler<Query, Hotels>
        {
            private readonly IAmadeusTokenService _tokenService;
            public Handler(IAmadeusTokenService tokenService)
            {
                _tokenService = tokenService;
            }

            public async Task<Hotels> Handle(Query request, CancellationToken cancellationToken)
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
                return reservationList;
            }
        }
    }
}