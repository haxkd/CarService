using EComm.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using BusinessLogicLayer;
using DataAccessLayer.Model;
using System.IO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using DataAccessLayer.Dto;

namespace EComm.Repository
{
    public class CarRepository : ICars
    {
        public CarLogic logic;
        public CarRepository(CarLogic logic)
        {
            this.logic = logic;
        }

        public List<Car> GetCars()
        {
            try
            {
                return logic.GetCars();
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
                return logic.CarSearch(query);
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
                return logic.GetCar(id);
            }
            catch
            {
                throw;
            }
        }

        public Car AddCar(CarDto car)
        {
            try
            {
                return logic.AddCar(car);
            }
            catch
            {
                throw;
            }
        }
        public Car UpdateCar(int id,CarDto car)
        {
            try
            {               
                return logic.UpdateCar(id,car);
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
                return logic.DeleteCar(id);
            }
            catch
            {
                throw;
            }
        }
    }
}
