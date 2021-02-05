using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QuizAPI.DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KvizController : ControllerBase
    {
        private readonly IMongoClient client;

        public KvizController(IMongoClient client)
        {
            this.client = client;
        }

        [HttpPost("{email}")]
        // Dodavanje kviza
        public async Task<IActionResult> DodajKviz(Kviz kviz, string email)
        {
            var db = client.GetDatabase("quiz");
            var kvizovi_collection = db.GetCollection<Kviz>("kvizovi");
            var korisnici_collection = db.GetCollection<Korisnik>("korisnici");

            var korisnik = await korisnici_collection.Find(x => x.Email == email).FirstOrDefaultAsync();
            kviz.Korisnik = new MongoDBRef("korisnici", korisnik.Id);

            await kvizovi_collection.InsertOneAsync(kviz);

            var kviz_iz_baze = await kvizovi_collection.Find(x => x.Naziv == kviz.Naziv).FirstOrDefaultAsync();
            korisnik.Kvizovi.Add(new MongoDBRef("kvizovi", kviz_iz_baze.Id));
            await korisnici_collection.ReplaceOneAsync(x => x.Email == email, korisnik);
            
            return Ok();
        }
    }
}
