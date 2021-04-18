
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.HotelsHandler;
using Application.Services;
using Application.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class HotelsController : BaseApiController
    {
        IAmadeusTokenService _tokenService;
                
        public HotelsController(IAmadeusTokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<Hotels>> getHotels(CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new HotelsList.Query { param = Params.with("cityCode", "PAR") }, cancellationToken));
        }

        [HttpPost]
        //[ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any, VaryByQueryKeys = new[] { "cityCode" })]
        public async Task<ActionResult<Hotels>> getHotels()
        {
            string json;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                json = await reader.ReadToEndAsync();
            }
            Params userQuery = Params.from(JsonConvert.DeserializeObject<Dictionary<string, string>>(json));
            return Ok(await Mediator.Send(new HotelsList.Query { param = userQuery }));
        }
    }
}