using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Driver;
using MongoDB_Repository;
using QuizAPI.DomainModel;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {
        private readonly IMongoClient client;

        public KorisnikController(IMongoClient client)
        {
            this.client = client;
        }

        [HttpGet]
        // Test metoda
        public void Get()
        {
            var db = client.GetDatabase("quiz");

            var collection = db.GetCollection<Korisnik>("korisnici");

            /*Radnik radnik1 = new Radnik { ime = "Petar", prezime = "Petrović", Adresa = "Oblačića Rada 12", Plata = 25000, oznake = new List<string> { "muškarac", "ekonomista", "pripravnik" } };
            Radnik radnik2 = new Radnik { ime = "Sava", prezime = "Janković", Adresa = "Voždova 23", Plata = 40000, oznake = new List<string> { "muškarac", "pravnik", "rukovodilac" } };
            Radnik radnik3 = new Radnik { ime = "Milutin", prezime = "Simić", Adresa = "Dušanova 112", Plata = 33000 };
            Radnik radnik4 = new Radnik { ime = "Jelena", prezime = "Antić", Adresa = "Bulevar Nemanjića 134", Plata = 40000, oznake = new List<string> { "žena", "pravnik" } };
            Radnik radnik5 = new Radnik { ime = "Mirjana", prezime = "Vukić", Adresa = "Bulevar Nemanjića 23", Plata = 29000, oznake = new List<string> { "žena" } };*/

            Korisnik korisnik1 = new Korisnik
            {
                Ime = "Pera",
                Prezime = "Peric",
                Email = "pera@gmail.com",
                Password = "pera123"
            };
            Korisnik korisnik2 = new Korisnik
            {
                Ime = "Zika",
                Prezime = "Zikic",
                Email = "zika@gmail.com",
                Password = "zika123"
            };


            collection.InsertOne(korisnik1);
            collection.InsertOne(korisnik2);
        }

        [HttpPost]
        // Dodaje novog korisnika (registracija)
        public async Task<IActionResult> DodajKorisnika(Korisnik korisnik)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            await collection.InsertOneAsync(korisnik);

            return Ok();
        }

        [HttpPost("login")]
        // Login-ovanje korisnika
        public async Task<object> LoginKorisnika(Korisnik korisnik)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            var ret = await collection.Find(x => x.Email == korisnik.Email && x.Password == korisnik.Password)
                      .FirstOrDefaultAsync();

            if(ret != null)
            {
                return new
                {
                    Uspesno = true,
                    Ime = ret.Ime,
                    Prezime = ret.Prezime
                };
            }
            else
            {
                return new
                {
                    Uspesno = false
                };
            }
        }

        [HttpGet("svi")]
        // Vraca sve korisnike
        public async Task<ActionResult<List<Korisnik>>> VratiSveKorisnike()
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            return await collection.Find(FilterDefinition<Korisnik>.Empty).ToListAsync();
        }
    }
}
