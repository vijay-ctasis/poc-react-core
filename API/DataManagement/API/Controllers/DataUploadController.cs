using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using ExcelDataReader;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DataUploadController : ControllerBase
    {
        private IDataService _dataService;

        public DataUploadController(IDataService dataService)
        {
            _dataService = dataService;
        }


        [AllowAnonymous]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult UploadData(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    if (file.FileName.EndsWith(".xls") || file.FileName.EndsWith(".xlsx"))
                    {
                        List<SampleData> objData = new List<SampleData>();
                        Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                        using (var stream = new MemoryStream())
                        {
                            file.CopyTo(stream);
                            stream.Position = 0;
                            using (var reader = ExcelReaderFactory.CreateReader(stream))
                            {
                                while (reader.Read())
                                {
                                    objData.Add(new SampleData
                                    {
                                        Mit = reader.GetValue(0).ToString(),
                                        Code = reader.GetValue(1).ToString(),
                                        CurrencyCode = reader.GetValue(2).ToString(),
                                        Subscription = Convert.ToInt64(reader.GetValue(3)),
                                        Redemption = Convert.ToInt64(reader.GetValue(4)),
                                        Expense = Convert.ToInt64(reader.GetValue(5)),
                                        Net = Convert.ToInt64(reader.GetValue(6))
                                    });
                                }
                            }

                            if (_dataService.UploadData(objData))
                            {
                                return Ok("Data Uploaded Successfully");
                            }
                            else
                            {
                                return StatusCode(500, $"Internal server error occurred");
                            }
                        }
                    }
                    else
                    {
                        return BadRequest("Invalid File");
                    }
                }
                else
                {
                    return BadRequest("Empty File");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
