namespace WebJet_Test_Vijay.Models
{
    public interface IAppSettings
    {
        string ExternalMovieApiUrl { get; }
        string ExternalMoviesApiUrl { get; }
        string TokenPath { get; }
        string XAccessToken { get; }
    }
}