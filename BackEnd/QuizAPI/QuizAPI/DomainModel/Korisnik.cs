using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.DomainModel
{
    public class Korisnik
    {
        public ObjectId Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Kviz> Kvizovi { get; set; }

        public Korisnik()
        {
            Kvizovi = new List<Kviz>();
        }

    }
}
