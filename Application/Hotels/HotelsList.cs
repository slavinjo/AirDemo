
using System.Threading;
using System.Threading.Tasks;
using MediatR;


namespace Application.HotelsHandler
{
    public class HotelsList
    {
        public class Query : IRequest<Hotels> {
            
        }

        public class Handler : IRequestHandler<Query, Hotels>
        {
            public Handler()
            {
            }

            public async Task<Hotels> Handle(Query request, CancellationToken cancellationToken)
            {
                throw new System.NotImplementedException();
            }
        }
    }
}