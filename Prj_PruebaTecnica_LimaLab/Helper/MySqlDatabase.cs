using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prj_PruebaTecnica_LimaLab.Helper
{
    public class MySqlDatabase : IDisposable
    {
        public MySqlConnection Connection;

        public MySqlDatabase()
        {
            //Connection = new Connection(connectionString);
            Connection = new MySqlConnection("Server=localhost;Database=pruebatecnicabd;Uid=root");
            this.Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }

    }
}
