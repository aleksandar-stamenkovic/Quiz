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
            // kviz.Id = DateTimeOffset.Now.ToUnixTimeMilliseconds().ToString();
            kviz.Id = ObjectId.GenerateNewId();
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

            var objId = ObjectId.Parse(id);
            var filter = Builders<Korisnik>.Filter.ElemMatch(x => x.Kvizovi, x => x.Id == objId);
            var korisnik = await collection.Find(filter).FirstOrDefaultAsync();

            return korisnik.Kvizovi.FirstOrDefault(x => x.Id == objId);
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

        [HttpPost("ucesnik/{id}")]
        // Dodaje ucesnika na osnovu id-a kviza
        public async Task DodajUcesnika([FromBody]Ucesnik ucesnik, [FromRoute]string id)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            var objId = ObjectId.Parse(id);
            var filter = Builders<Korisnik>.Filter.ElemMatch(x => x.Kvizovi, x => x.Id == objId);
            var update = Builders<Korisnik>.Update.Push("Kvizovi.$.Ucesnici", ucesnik);
            await collection.FindOneAndUpdateAsync(filter, update);

        }

        [HttpDelete("{id}")]
        // Brisanje kviza na osnovu id-a
        public async Task ObrisiKviz(string id)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            var objId = ObjectId.Parse(id);
            var filter = Builders<Korisnik>.Filter.ElemMatch(x => x.Kvizovi, x => x.Id == objId);
            var update = Builders<Korisnik>.Update.PullFilter(x => x.Kvizovi, x => x.Id == objId);
            await collection.FindOneAndUpdateAsync(filter, update);
        }

        [HttpGet("proveri/{id}")]
        // Proverava da li postoji kviz sa zadatim id-jem
        public async Task<bool> Proveri(string id)
        {
            var db = client.GetDatabase("quiz");
            var collection = db.GetCollection<Korisnik>("korisnici");

            bool ok = ObjectId.TryParse(id, out var objId);
            if (!ok)
                return false;

            var filter = Builders<Korisnik>.Filter.ElemMatch(x => x.Kvizovi, x => x.Id == objId);
            var korisnik = await collection.Find(filter).FirstOrDefaultAsync();
            if (korisnik == null)
                return false;

            var kviz = korisnik.Kvizovi.FirstOrDefault(x => x.Id == objId);

            if (kviz != null)
                return true;
            else
                return false;

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
