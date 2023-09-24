using DataAccessLayer.Data;
using DataAccessLayer.Dto;
using DataAccessLayer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class AgreementLogic
    {
        readonly ApplicationDbContext _context;
        public AgreementLogic(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public Rental AddRental(int uid, AgreementDto agreement)
        {
            try
            {
                Rental rental = new Rental();
                rental.RentCar = (int)agreement.CarId;
                rental.RentCost = agreement.TotalCost;
                rental.RentDuration = agreement.Duration;
                rental.RentUser = uid;
                _context.Rentals.Add(rental);
                _context.SaveChanges();
                return rental;
            }
            catch
            {
                throw;
            }
        }

        public List<Rental> GetRentals(int? uid)
        {
            try
            {
                if (uid == null)
                {
                    return _context.Rentals.Include(r=>r.RentUserNavigation).Include(r=>r.RentCarNavigation).ToList();
                }
                else
                {
                    return _context.Rentals.Where(x => x.RentUser == uid).Include(r => r.RentUserNavigation).Include(r => r.RentCarNavigation).ToList();
                }
            }
            catch
            {
                throw;
            }
        }

        public Rental GetRental(int id)
        {
            try
            {
                //var rental =  _context.Rentals.FirstOrDefault(x => x.RentId == id);
                //rental.RentCarNavigation = _context.Cars.FirstOrDefault(x=>x.CarId==rental.RentCar);
                //rental.RentUserNavigation = _context.Users.FirstOrDefault(x=>x.UserId==rental.RentUser);
                //return rental;


                return _context.Rentals.Include(r=>r.RentCarNavigation).Include(r=>r.RentUserNavigation).FirstOrDefault(x => x.RentId == id);
                //return _context.Rentals.FirstOrDefault(x => x.RentId == id);
            }
            catch
            {
                throw;
            }
        }


        public Rental EditRental(int id, AgreementDto agreement)
        {
            try
            {
                var rental = _context.Rentals.FirstOrDefault(x => x.RentId == id);
                if (agreement.TotalCost != null)
                {
                    rental.RentCost = agreement.TotalCost;
                }
                if (agreement.Duration != null)
                {
                    rental.RentDuration = agreement.Duration;
                }
                if (agreement.CarId != null)
                {
                    rental.RentCar = (int)agreement.CarId;
                }
                if (agreement.status != null)
                {
                    rental.RentStatus = agreement.status;

                    if (agreement.status == "rented")
                    {
                        updateQuantity(rental.RentCar,-1);
                        rental.RentDate = DateTime.Now;
                    }
                    if (agreement.status == "returned")
                    {
                        updateQuantity(Convert.ToInt32(rental.RentCar), 1);
                    }
                }
                _context.SaveChanges();
                return rental;
            }
            catch
            {
                throw;
            }
        }

        public void BlockUser(int RentId)
        {
            Rental rental = _context.Rentals.FirstOrDefault(x => x.RentId == RentId);
            rental.RentStatus = "returned";
            User user = _context.Users.FirstOrDefault(x => x.UserId == rental.RentUser);
            user.UserStatus = "block";
            _context.SaveChanges();
            updateQuantity(rental.RentCar, 1);
        }

        public Rental DeleteRental(int id)
        {
            try
            {
                Rental? rental = _context.Rentals.Find(id);

                if (rental != null)
                {
                    _context.Rentals.Remove(rental);
                    _context.SaveChanges();
                    return rental;
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


        public void updateQuantity(int CarId,int Quantity)
        {
            Car car = _context.Cars.FirstOrDefault(x=>x.CarId==CarId);
            if (car != null)
            {
                car.CarQuantity += Quantity;
            }
            _context.SaveChanges();
        }

    }
}
