using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using WebJet_Test_Vijay.Models;
using WebJet_Test_Vijay.Service;

namespace WebJet_Test_Vijay.Services
{
    public class MovieController : IMovieController
    {
        private static string token = "sjd1HfkjU83ksdsm3802k";//Add the token here
        private static string BASE_URL = "http://webjetapitest.azurewebsites.net";
        readonly ILogger<MovieController> log;
        private AppSettings _appSettings { get; set; }
        
        public MovieController()
        {
           
        }
        public async Task<List<Movie>> ListMoviesByCategoryAsync(MovieCategory category)
        {
            int TotalNumberOfAttempts = 3;
            int numberOfAttempts = 0;
            while (true)
            {
                try
                {
                    var url = UrlSuffixHelper(category);
                    var jsonStr = await HttpGetCallAsync(url);
                    var json = JsonConvert.DeserializeObject<JObject>(jsonStr);
                    var movies = json["Movies"].ToObject<List<Movie>>();
                    return movies;
                }
                catch
                {
                    numberOfAttempts++;
                    if (numberOfAttempts >= TotalNumberOfAttempts)
                        throw;
                }
            }

        }

        public async Task<Movie> FindMovieByCategoryByIdAsync(MovieCategory category, string Id)
        {
            int TotalNumberOfAttempts = 3;
            int numberOfAttempts = 0;
            while (true)
            {
                try
                {
                    var url = UrlSuffixHelper(category, Id);
                    var json = await HttpGetCallAsync(url);
                    var movie = JsonConvert.DeserializeObject<Movie>(json);
                    return movie;
                }
                catch
                {
                    numberOfAttempts++;
                    if (numberOfAttempts >= TotalNumberOfAttempts)
                        throw;
                }
            }
        }

        public async Task<string> HttpGetCallAsync(string url)
        {
            string jsonStr = "";
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(BASE_URL);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("x-access-token", _appSettings.XAccessToken);
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    jsonStr = await response.Content.ReadAsStringAsync();

                }
                else
                {
                    response.EnsureSuccessStatusCode();
                }
            }
            return jsonStr;
        }

        public string UrlSuffixHelper(MovieCategory cateogry, string Id = null)
        {
            switch (cateogry)
            {
                case MovieCategory.CinemaWorld:

                    return Id == null || Id == string.Empty ? "/api/cinemaworld/movies" : string.Format("/api/cinemaworld/movie/{0}", Id);
                case MovieCategory.FilmWorld:
                    return Id == null || Id == string.Empty ? "/api/filmworld/movies" : string.Format("/api/filmworld/movie/{0}", Id);
                default:
                    return "";
            }
        }
    }
}
