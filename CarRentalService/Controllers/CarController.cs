using BusinessLogicLayer;
using DataAccessLayer.Model;
using EComm.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DataAccessLayer.Dto;
using Microsoft.EntityFrameworkCore;

namespace CarRentalService.Controllers
{
    [Route("api/car")]
    [ApiController]
    public class CarController : Controller
    {
        private readonly ICars _ICars;

        public CarController(ICars ICars)
        {
            this._ICars = ICars;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> Get()
        {
            return await Task.FromResult(_ICars.GetCars());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(int id)
        {
            try
            {
                var car = await Task.FromResult(_ICars.GetCar(id));
                if (car == null)
                {
                    return NotFound();
                }
                return car;
            }
            catch
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Car>> Post([FromForm] CarDto postRequest)
        {
            var x = _ICars.AddCar(postRequest);
            return await Task.FromResult(x);
        }

        [HttpGet("search/{query}")]
        public async Task<ActionResult<IEnumerable<Car>>> SearchProduct(string query)
        {
            return await Task.FromResult(_ICars.CarSearch(query));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Car>> Put(int id, [FromForm] CarDto carDto)
        {
            try
            {
                _ICars.UpdateCar(id, carDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Unable to update");
            }
            Car car = await Task.FromResult(_ICars.GetCar(id));
            return await Task.FromResult(car);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> Delete(int id)
        {
            var car = _ICars.DeleteCar(id);
            return await Task.FromResult(car);
        }

    }
}
