using DataAccessLayer.Data;
using DataAccessLayer.Dto;
using DataAccessLayer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class CarLogic
    {
        readonly ApplicationDbContext _context;
        public CarLogic(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public List<Car> GetCars()
        {
            try
            {
                return _context.Cars.ToList();
            }
            catch
            {
                throw;
            }
        }
        public Car GetCar(int id)
        {
            try
            {
                Car? car = _context.Cars.Find(id);
                if (car != null)
                {
                    return car;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }
        public List<Car> CarSearch(string query)
        {
            try
            {
                return _context.Cars.Where(x => x.CarMaker.Contains(query) || x.CarModel.Contains(query)).ToList();
            }
            catch
            {
                throw;
            }
        }
        public Car AddCar(CarDto carDto)
        {
            try
            {
                if (!IsPhoto(carDto.CarImage.FileName))
                {
                    throw new Exception("Image should be JPG or PNG");
                }

                string path = "";

                if (carDto.CarImage.Length > 0)
                {
                    path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot/images"));
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (var fileStream = new FileStream(Path.Combine(path, carDto.CarImage.FileName), FileMode.Create))
                    {
                        // product1.pImage.CopyToAsync(fileStream);
                        carDto.CarImage.CopyTo(fileStream);
                    }
                }

                Car car = new Car();
                car.CarMaker = carDto.CarMaker;
                car.CarModel = carDto.CarModel;
                car.CarPrice = carDto.CarPrice;
                car.CarQuantity = carDto.CarQuantity;
                car.CarImage = "images/" + carDto.CarImage.FileName;
                _context.Cars.Add(car);
                _context.SaveChanges();
                return car;
            }
            catch
            {
                throw;
            }
        }


        public Car UpdateCar(int id, CarDto carDto)
        {
            try
            {
                var car = _context.Cars.FirstOrDefault(x => x.CarId == id);
                car.CarMaker = carDto.CarMaker;
                car.CarModel = carDto.CarModel;
                car.CarPrice = carDto.CarPrice;
                car.CarQuantity = carDto.CarQuantity;
                if (carDto.CarImage != null)
                {
                    if (!IsPhoto(carDto.CarImage.FileName))
                    {
                        throw new Exception("Image should be JPG or PNG");
                    }
                    string path = "";

                    if (carDto.CarImage.Length > 0)
                    {
                        path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot/images"));
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        using (var fileStream = new FileStream(Path.Combine(path, carDto.CarImage.FileName), FileMode.Create))
                        {
                            carDto.CarImage.CopyToAsync(fileStream);
                        }
                        car.CarImage = "images/" + carDto.CarImage.FileName;
                    }
                }
                //_dbContext.Entry(product).State = EntityState.Modified;
                _context.SaveChanges();
                return car;
            }
            catch
            {
                throw;
            }
        }

        public Car DeleteCar(int id)
        {
            try
            {
                Car? car = _context.Cars.Find(id);

                if (car != null)
                {
                    _context.Cars.Remove(car);
                    _context.SaveChanges();
                    return car;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }

        public static bool IsPhoto(string fileName)
        {
            List<string> list = new List<string> { ".jpg", ".jpeg", ".png" };

            var filename = fileName.ToLower();
            bool isThere = false;
            foreach (var item in list)
            {
                if (filename.EndsWith(item))
                {
                    isThere = true;
                    break;
                }
            }
            return isThere;
        }
    }
}
