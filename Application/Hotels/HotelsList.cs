using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using Application.Utils;
using MediatR;
using Newtonsoft.Json;
using Microsoft.Extensions.Caching.Memory;
using System;
using Microsoft.Extensions.Configuration;

namespace Application.HotelsHandler
{
    public class HotelsList
    {

        public class Query : IRequest<Hotels>
        {
            public Params param { get; set; }
        }

        public class Handler : IRequestHandler<Query, Hotels>
        {
            private readonly IAmadeusTokenService _tokenService;
            private readonly HttpClient _httpClient;
            private readonly IMemoryCache _memoryCache;
            private readonly IConfiguration _config;
            public Handler(IAmadeusTokenService tokenService, HttpClient httpClient, IMemoryCache memoryCache)
            {
                _memoryCache = memoryCache;
                _httpClient = httpClient;
                _tokenService = tokenService;
            }

            public async Task<Hotels> Handle(Query request, CancellationToken cancellationToken)
            {

                Hotels cacheEntry;
                String cacheKey = request.param.toQueryString();

                // Look for cache key.
                if (!_memoryCache.TryGetValue(cacheKey, out cacheEntry))
                {
                    // Key not in cache, so get data.
                    cacheEntry = await GetHotelsCall(_httpClient, _tokenService, request);

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(10));

                    // Save data in cache.
                    _memoryCache.Set(cacheKey, cacheEntry, cacheEntryOptions);
                }
                return cacheEntry;
            }

            private async Task<Hotels> GetHotelsCall(HttpClient httpClient, IAmadeusTokenService tokenService, Query request)
            {
                AmadeusToken token = await tokenService.GetToken();
                Hotels hotelsList = new Hotels();

                _httpClient.DefaultRequestHeaders.Authorization
                         = new AuthenticationHeaderValue("Bearer", token.access_token);
                using (var response = await _httpClient.GetAsync("https://test.api.amadeus.com/v2/shopping/hotel-offers" + request.param.toQueryString()))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    hotelsList = JsonConvert.DeserializeObject<Hotels>(apiResponse);
                }

                return hotelsList;
            }
        }

    }
}