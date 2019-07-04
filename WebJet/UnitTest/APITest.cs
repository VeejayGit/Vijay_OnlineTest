using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace WebJet_Test
{
    public class APITest
    {
        string url = "http://webjetapitest.azurewebsites.net//";
        string token = "sjd1HfkjU83ksdsm3802k";
        string cinemaworld = "api/cinemaworld/movies";
        string movieworld = "api/filmworld/movies";
        
 
        [Fact]
        public async Task HttpClient_Using_Cinemaworld()
        {
            var client = new HttpClient { BaseAddress = new Uri(url) };
            client.DefaultRequestHeaders.Add("x-access-token", token);
            using (var response = await client.GetAsync(cinemaworld))
            {
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
        }

        [Fact]
        public async Task Test_Condition_for_HttpClient_Using_Filmworld()
        {
            var client = new HttpClient { BaseAddress = new Uri(url) };
            client.DefaultRequestHeaders.Add("x-access-token", token);
            using (var response = await client.GetAsync(movieworld))
            {
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }

        }

        [Fact]
        public async Task Test_Condition_for_HttpClient_Cinemaworld_ByID()
        {
            var client = new HttpClient { BaseAddress = new Uri(url) };
            client.DefaultRequestHeaders.Add("x-access-token", token);
            using (var response = await client.GetAsync("api/cinemaworld/movies/cw0080684"))
            {
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }

        }
       
    }
}
