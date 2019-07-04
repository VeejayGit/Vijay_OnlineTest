using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebJet_Test_Vijay.Service
{
    public interface IMovieController
    {
        Task<List<Movie>> ListMoviesByCategoryAsync(MovieCategory category);
        Task<Movie> FindMovieByCategoryByIdAsync(MovieCategory category, string Id);
    }
    public enum MovieCategory
    {
        CinemaWorld = 0,
        FilmWorld = 1
    }
    public class Movie
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public Nullable<int> Year { get; set; }
        public string Rated { get; set; }
        public Nullable<System.DateTime> Released { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public string Writor { get; set; }
        public string Actors { get; set; }
        public string Lot { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }
        public string Poster { get; set; }
        public Nullable<int> Metascore { get; set; }
        public Nullable<double> Rating { get; set; }
        public string Votes { get; set; }
        public string Type { get; set; }
        public Nullable<double> Price { get; set; }
        public string Category { get; set; }
        public string RunTime { get; set; }
        public string Plot { get; set; }
    }
}
