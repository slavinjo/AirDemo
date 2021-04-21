using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Application.Utils;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Application.Services
{
    public interface IAmadeusTokenService
    {
        Task<AmadeusToken> GetToken();
    }
    public class AmadeusTokenService : IAmadeusTokenService
    {
        // Renew the token 10 seconds earlier than required,
        // just to account for system lag
        private const long TOKEN_BUFFER = 10000;
        private AmadeusToken _amadeusToken = null;
        // The (UNIX) expiry time of this token
        private long expiresAt { get; set; }

        private readonly IConfiguration _config;

        private readonly HttpClient _httpClient;
        public AmadeusTokenService(HttpClient httpClient, IConfiguration config)
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task<AmadeusToken> GetToken()
        {
            try
            {
                if (NeedsRefresh())
                {
                    return await RevokeToken();
                }
                else return _amadeusToken;
            }
            catch (Exception re)
            {
                throw re;
            }
        }

        public async Task<AmadeusToken> RevokeToken()
        {
            Dictionary<string, string> body = Params.With("grant_type", _config.GetConnectionString("AmadeusGrantType")).And("client_id", _config.GetConnectionString("AmadeusID")).And("client_secret", _config.GetConnectionString("AmadeusSecret"));
            var response = await _httpClient.PostAsync(new Uri(_config.GetConnectionString("AmadeusTokenAPIUrl")), new FormUrlEncodedContent(body));
            var responseBodyString = await response.Content.ReadAsStringAsync();

            _amadeusToken = JsonConvert.DeserializeObject<AmadeusToken>(responseBodyString);
            int expiresIn = _amadeusToken.expires_in;
            this.expiresAt = GetCurrentMilli() + expiresIn * 1000L;

            return _amadeusToken;
        }

        // Checks if this access token needs a refresh.
        private bool NeedsRefresh()
        {
            bool isNull = _amadeusToken == null;
            bool expired = (GetCurrentMilli() + TOKEN_BUFFER) > expiresAt;
            return isNull || expired;
        }
        private static long GetCurrentMilli()
        {
            DateTime Jan1970 = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            TimeSpan javaSpan = DateTime.UtcNow - Jan1970;
            return (long)javaSpan.TotalMilliseconds;
        }

    }
}