using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WebJet_Test_Vijay.Services
{
    public interface IExternalMovieService
    {
        string GetMovies(string moviesService);
        string GetMovie(string moviesService, string movieId);
    }
}
