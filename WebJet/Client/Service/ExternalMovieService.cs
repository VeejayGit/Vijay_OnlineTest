using log4net;
using log4net.Core;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using WebJet_Test_Vijay.Models;


namespace WebJet_Test_Vijay.Services
{
   
    public class ExternalMovieService : IExternalMovieService
    {
        private readonly IAppSettings _appSettings;
        readonly ILogger<ExternalMovieService> log;
        private AppSettings AppSettings { get; set; }
        public ExternalMovieService(ILogger<ExternalMovieService> logger, IOptions<AppSettings> settings)
        {
            log = logger;
            AppSettings = settings.Value;
        }
        

        public string GetMovie(string moviesService, string movieId)
        {
            var request = (HttpWebRequest)WebRequest.Create(string.Format(AppSettings.ExternalMovieApiUrl, moviesService, movieId));
            request = AddHeaders(request);

            string myResponse = "";

            try { 
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    myResponse = sr.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                log.LogInformation(string.Concat("External service call to GetMovies failed with error message: ", ex.Message, ex.InnerException));
                return null;
            }

            return myResponse;
        }

        public string GetMovies(string moviesService)
        {
            var request = (HttpWebRequest)WebRequest.Create(string.Format(AppSettings.ExternalMoviesApiUrl, moviesService));
            request = AddHeaders(request);

            string myResponse = "";

            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    myResponse = sr.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                log.LogInformation(string.Concat("External service call to GetMovies failed with error message: ", ex.Message, ex.InnerException));
                return null;
            }

            return myResponse;
        }

        private HttpWebRequest AddHeaders(HttpWebRequest request)
        {
            request.Method = "Get";
            request.KeepAlive = false;
            request.Headers.Add("x-access-token", AppSettings.XAccessToken);
            return request;
        }
    }
}
