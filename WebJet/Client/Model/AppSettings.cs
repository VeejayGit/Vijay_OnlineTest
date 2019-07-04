using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
 

namespace WebJet_Test_Vijay.Models
{
    public class AppSettings : IAppSettings
    {
        private IConfiguration _config;
        public string ExternalMoviesApiUrl { get; set; }
        public string ExternalMovieApiUrl { get; set; }
        public string XAccessToken { get; set; }
        public string TokenPath { get; set; }
 
    }
    
}