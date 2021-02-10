using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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
            var collection = db.GetCollection<Korisnik>("korisnici");
            kviz.Id = DateTimeOffset.Now.ToUnixTimeMilliseconds().ToString();

            var filter = Builders<Korisnik>.Filter.Eq(x => x.Email, email);
            var update = Builders<Korisnik>.Update.Push(x => x.Kvizovi, kviz);
            await collection.FindOneAndUpdateAsync(filter, update);

            return Ok();
        }

        [HttpGet("{id}")]
        // Vraca kviz na osnovu id-a
        public async Task<Kviz> VratiKviz(string id)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");


            var filter = Builders<Korisnik>.Filter.ElemMatch(x => x.Kvizovi, x => x.Id == id);
            var korisnik = await collection.Find(filter).FirstOrDefaultAsync();

            return korisnik.Kvizovi.FirstOrDefault(x => x.Id == id);
        }

        [HttpGet("email/{email}")]
        // Vraca listu kvizova na osnovu email-a
        public List<Kviz> VratiKvizove(string email)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            var korisnik = collection.Find(x => x.Email == email).FirstOrDefault();

            var kvizovi = korisnik.Kvizovi;

            return kvizovi;
            
        }

        [HttpGet("svi")]
        // Ne koristi se
        public async Task<Kviz> VratiSveKvizove()
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Kviz>("kvizovi");

            Kviz kviz = await collection.Find(FilterDefinition<Kviz>.Empty).FirstOrDefaultAsync();

            return kviz;
        }
    }
}
