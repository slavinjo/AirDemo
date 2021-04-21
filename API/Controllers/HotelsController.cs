
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using API.DTOs;
using Application.Core;
using Application.HotelsHandler;
using Application.Services;
using Application.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class HotelsController : BaseApiController
    {
        public HotelsController()
        {

        }

        [HttpPost]
        public async Task<IActionResult> GetHotels([FromBody] HotelQueryDto hotelQuery)
        {
            Params userQuery = Params.FromModelDto(hotelQuery).AddHotelSearchDefaultParams();
            Result<Hotels> result = await Mediator.Send(new HotelsList.Query { param = userQuery });
            return Ok(HotelMapper.HotelsToDto(result.Value));
        }
    }
}