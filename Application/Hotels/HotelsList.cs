using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using Application.Utils;
using MediatR;
using Microsoft.Extensions.Caching.Memory;
using System;
using Microsoft.Extensions.Configuration;
using Application.Core;

namespace Application.HotelsHandler
{
    public class HotelsList
    {
        public class Query : IRequest<Result<Hotels>>
        {
            public Params param { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Hotels>>
        {
            private readonly IAmadeusTokenService _tokenService;
            private readonly IConfiguration _config;
            private readonly IAmadeusQueryService _amadeusQueryService;
            private readonly ICacheService _cacheService;
            public Handler(IAmadeusTokenService tokenService, IAmadeusQueryService amadeusQueryService, ICacheService cacheService)
            {
                _cacheService = cacheService;
                _amadeusQueryService = amadeusQueryService;
                _tokenService = tokenService;
            }

            public async Task<Result<Hotels>> Handle(Query request, CancellationToken cancellationToken)
            {
                String cacheKey = request.param.ToQueryString();
                var cacheEntry = _cacheService.TryGetCachedResponse<Result<Hotels>>(cacheKey);
                if (cacheEntry == null)
                {
                    cacheEntry = await _amadeusQueryService.GetHotelsCall(request);
                    _cacheService.SetCacheEntry(cacheKey, cacheEntry);
                }
                return cacheEntry;
            }
        }
    }
}