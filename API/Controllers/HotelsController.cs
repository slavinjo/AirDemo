
using System.Threading;
using System.Threading.Tasks;
using Application.HotelsHandler;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

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
            return await Mediator.Send(new HotelsList.Query(), cancellationToken);
        }
    }
}