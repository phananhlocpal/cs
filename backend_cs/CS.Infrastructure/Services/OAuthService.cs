using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CS.Infrastructure.Services
{
    public class OAuthService
    {
        private readonly HttpClient _httpClient;

        public OAuthService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetAccessTokenAsync(string username, string password)
        {
            var content = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("grant_type", "password"),
            new KeyValuePair<string, string>("client_id", "your-client-id"),
            new KeyValuePair<string, string>("client_secret", "your-client-secret"),
            new KeyValuePair<string, string>("username", username),
            new KeyValuePair<string, string>("password", password)
        });

            var response = await _httpClient.PostAsync("https://your-oauth-provider.com/connect/token", content);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Failed to retrieve token.");

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<OAuthTokenResponse>(responseContent)?.AccessToken;
        }
    }

    public class OAuthTokenResponse
    {
        public string AccessToken { get; set; }
    }

}
