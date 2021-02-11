using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.DomainModel
{
    public class Kviz
    {
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public string Naziv { get; set; }
        public IList<Pitanje> Pitanja { get; set; }
        public IList<Ucesnik> Ucesnici { get; set; }
        
        //public Korisnik Korisnik { get; set; }

        public Kviz()
        {
            //Id = ObjectId.GenerateNewId();
            Pitanja = new List<Pitanje>();
            Ucesnici = new List<Ucesnik>();
        }
    }
}
