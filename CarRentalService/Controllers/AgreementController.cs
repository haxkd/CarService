using BusinessLogicLayer;
using DataAccessLayer.Dto;
using DataAccessLayer.Model;
using EComm.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CarRentalService.Controllers
{
    [Route("api/agreement")]
    [ApiController]
    public class AgreementController : Controller
    {
        public readonly AgreementLogic logic;
        readonly IHttpContextAccessor _httpcontext;
        public AgreementController(IHttpContextAccessor httpcontext,AgreementLogic logic)
        {
            _httpcontext = httpcontext ?? throw new ArgumentNullException(nameof(httpcontext));
            this.logic = logic;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Rental>> Post(AgreementDto postRequest)
        {
            int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);
            var x = logic.AddRental(uid, postRequest);
            return await Task.FromResult(x);
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> Get()
        {
            return await Task.FromResult(logic.GetRentals(null));
        }

        [Authorize]
        [HttpGet("user/")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetSingle()
        {
            int uid = Convert.ToInt32(_httpcontext.HttpContext.User.Claims
                       .First(i => i.Type == "UserId").Value);
            return await Task.FromResult(logic.GetRentals(uid));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> Get(int id)
        {
            try
            {
                var rental = await Task.FromResult(logic.GetRental(id));
                if (rental == null)
                {
                    return NotFound();
                }
                return rental;
            }
            catch
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, AgreementDto agreement)
        {
            try
            {
                logic.EditRental(id, agreement);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Unable to update");
            }
            //Rental rental = await Task.FromResult(logic.GetRental(id));
            //return await Task.FromResult(rental);
            return Ok();
        }



        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rental>> Delete(int id)
        {
            var rental = logic.DeleteRental(id);
            return await Task.FromResult(rental);
        }

        [Authorize]
        [HttpPost("blockuser/{RentId}")]
        public Task<ActionResult> BlockUser(int RentId)
        {
            try
            {
                logic.BlockUser(RentId);
                return Task.FromResult<ActionResult>(Ok("User Blocked"));
            }
            catch (DbUpdateConcurrencyException)
            {
                return Task.FromResult<ActionResult>(BadRequest("Unable to process"));
            }
        }



    }
}
