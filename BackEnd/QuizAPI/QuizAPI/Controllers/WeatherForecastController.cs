using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Driver;
using MongoDB_Repository;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IMongoClient client;

        public WeatherForecastController(IMongoClient client)
        {
            this.client = client;
        }

        [HttpGet]
        public void Get()
        {
            var db = client.GetDatabase("preduzece");

            var collection = db.GetCollection<Radnik>("radnici");

            Radnik radnik1 = new Radnik { ime = "Petar", prezime = "Petrović", Adresa = "Oblačića Rada 12", Plata = 25000, oznake = new List<string> { "muškarac", "ekonomista", "pripravnik" } };
            Radnik radnik2 = new Radnik { ime = "Sava", prezime = "Janković", Adresa = "Voždova 23", Plata = 40000, oznake = new List<string> { "muškarac", "pravnik", "rukovodilac" } };
            Radnik radnik3 = new Radnik { ime = "Milutin", prezime = "Simić", Adresa = "Dušanova 112", Plata = 33000 };
            Radnik radnik4 = new Radnik { ime = "Jelena", prezime = "Antić", Adresa = "Bulevar Nemanjića 134", Plata = 40000, oznake = new List<string> { "žena", "pravnik" } };
            Radnik radnik5 = new Radnik { ime = "Mirjana", prezime = "Vukić", Adresa = "Bulevar Nemanjića 23", Plata = 29000, oznake = new List<string> { "žena" } };

            collection.InsertOne(radnik1);
            collection.InsertOne(radnik2);
            collection.InsertOne(radnik3);
            collection.InsertOne(radnik4);
            collection.InsertOne(radnik5);
        }
    }
}
