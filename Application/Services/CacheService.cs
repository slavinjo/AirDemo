using System;
using Application.Utils;
using Microsoft.Extensions.Caching.Memory;

namespace Application.Services
{
    public interface ICacheService
    {
        public T TryGetCachedResponse<T>(string cacheKey);
        public void SetCacheEntry<T>(string cacheKey, T cacheEntry);
    }
    public class CacheService : ICacheService
    {
        private readonly IMemoryCache _memoryCache;
        public CacheService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void SetCacheEntry<T>(string cacheKey, T cacheEntry)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
            // Keep in cache for 10 seconds
            .SetAbsoluteExpiration(TimeSpan.FromSeconds(Constants.AMADEUS_CACHE_TIME_SECONDS));

            // Save data in cache.
            _memoryCache.Set(cacheKey, cacheEntry, cacheEntryOptions);
        }

        public T TryGetCachedResponse<T>(string cacheKey)
        {
            T cacheEntry;
            if (_memoryCache.TryGetValue(cacheKey, out cacheEntry))
            {
                return cacheEntry;
            }
            return default(T);
        }



    }
}