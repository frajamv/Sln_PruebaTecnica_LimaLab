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
    public class CartController : ControllerBase
    {

        private readonly ILogger<CartController> _logger;

        private MySqlDatabase conn;

        public CartController(ILogger<CartController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public Boolean Post([FromBody] Product[] products)
        {
            conn = new MySqlDatabase();
            var cmd = conn.Connection.CreateCommand() as MySqlCommand;

            Guid guid = Guid.NewGuid();


            try
            {
                cmd.CommandText = @"INSERT INTO shoppingcart (shoppingCartID, status, created_at, updated_at) VALUES (@guid, 'A', CURRENT_DATE(),  CURRENT_DATE())";
                cmd.Parameters.AddWithValue("@guid", guid);
                var result = cmd.ExecuteNonQuery();

                if (result > 0)
                {
                    foreach (Product product in products)
                    {
                        cmd.Parameters.Clear();
                        cmd.CommandText = @"INSERT INTO shoppingcartitem (shoppingCartItemID, productID, amount_picked, shoppingCartID, created_at, updated_at) VALUES (UUID_SHORT(), @productID, @amount_picked, @shoppingCartID, CURRENT_DATE(), CURRENT_DATE()) ;";
                        cmd.Parameters.AddWithValue("@productID", product.productID);
                        cmd.Parameters.AddWithValue("@amount_picked", 1);
                        cmd.Parameters.AddWithValue("@shoppingCartID", guid);
                        result = cmd.ExecuteNonQuery();

                        if (result > 0)
                        {
                            cmd.Parameters.Clear();
                            cmd.CommandText = @"UPDATE product SET stockAmount = stockAmount-1 WHERE productID = @productID;";
                            cmd.Parameters.AddWithValue("@productID", product.productID);
                            result = cmd.ExecuteNonQuery();
                        }
                    }

                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
