using DataAccessLayer.Dto;
using DataAccessLayer.Model;

namespace EComm.Interface
{
    public interface ICars
    {
        public List<Car> GetCars();
        public List<Car> CarSearch(string query);
        public Car GetCar(int id);
        public Car AddCar(CarDto car);
        public Car UpdateCar(int id,CarDto car);
        public Car DeleteCar(int id);
    }
}
