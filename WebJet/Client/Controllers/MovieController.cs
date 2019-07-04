using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using WebJet_Test_Vijay.Model;
using WebJet_Test_Vijay.Services;

namespace WebJet_Test_Vijay.Controllers
{
   
    public class MovieController : ControllerBase
    {
        
        private readonly IExternalMovieService _externalMovieService;
        readonly ILogger<ExternalMovieService> log;

        public MovieController(IExternalMovieService externalMovieService, ILogger<ExternalMovieService> logger)
        {
            _externalMovieService = externalMovieService;
            log = logger;
        }

        // GET api/movies
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Movies controller is alive!");
        }

        //GET api/movies/{moviesService}

        [HttpGet, Route("{moviesService}")]
        public IActionResult GetMovies(string moviesService)
        {
            var returnObj = new JObject();
            try
            {
                returnObj = JObject.Parse(_externalMovieService.GetMovies(moviesService));
            }
            catch (Exception ex)
            {
                log.LogInformation(string.Concat(ErrorMessageConstants.ExternalServiceFailure, ex.Message, ex.InnerException));
                return BadRequest(ErrorMessageConstants.ExternalServiceFailure);
            }
            return Ok(returnObj);
        }

        // GET api/movies/{moviesService}/movie/{movieId}

        [HttpGet, Route("{moviesService}/movie/{movieId}")]
        public IActionResult GetMovie(string moviesService, string movieId)
        {
            var returnObj = new JObject();
            try
            {
                returnObj = JObject.Parse(_externalMovieService.GetMovie(moviesService, movieId));
            }
            catch (Exception ex)
            {
                log.LogInformation(string.Concat(ErrorMessageConstants.ExternalServiceFailure, ex.Message, ex.InnerException));
                return BadRequest(ErrorMessageConstants.ExternalServiceFailure);
            }
            return Ok(returnObj);
        }
    }
}
