using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Prj_PruebaTecnica_LimaLab.Helper;
using Prj_PruebaTecnica_LimaLab.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Prj_PruebaTecnica_LimaLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {

        private readonly ILogger<HomeController> _logger;

        private MySqlDatabase conn;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()
        {
            conn = new MySqlDatabase();
            var cmd = conn.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM Product;";
            //cmd.Parameters.AddWithValue("@TaskId", input.TaskId);
            //cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("yyyy/MM/dd"));

            var result = cmd.ExecuteReader();

            if(result.HasRows)
            {
                var dataTable = new DataTable();
                dataTable.Load(result);
                string JSONString = string.Empty;
                JSONString = JsonConvert.SerializeObject(dataTable);
                return JSONString;
            }
            return null;
        }
    }
}
