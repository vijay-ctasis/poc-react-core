using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IDataService
    {
        bool UploadData(List<SampleData> objDataList);
    }

    public class DataService : IDataService
    {
        private DataContext _context;

        public DataService(DataContext context)
        {
            _context = context;
        }

        public bool UploadData(List<SampleData> objDataList)
        {
            try
            {
                _context.SampleData.AddRange(objDataList);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}