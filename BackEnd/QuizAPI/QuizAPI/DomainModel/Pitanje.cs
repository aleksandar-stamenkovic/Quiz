using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.DomainModel
{
    public class Pitanje
    {
        public string Tekst { get; set; }      // Tekst pitanja
        public string Odgovor1 { get; set; }   // Prvi odgovor
        public string Odgovor2 { get; set; }   // Drugi odgovor
        public string Odgovor3 { get; set; }   // Treci odgovor
        public string Odgovor4 { get; set; }   // Cetvrti odgovor
        public int Tacan { get; set; }         // R. br. tacnog odgovora (1, 2, 3 ili 4)
    }
}
