using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.DomainModel
{
    public class Kviz
    {
        public string Id { get; set; }
        public string Naziv { get; set; }
        public IList<Pitanje> Pitanja { get; set; }
        
        //public Korisnik Korisnik { get; set; }

        public Kviz()
        {
            Pitanja = new List<Pitanje>();
        }
    }
}
