using Microsoft.AspNetCore.Mvc;

namespace Client.Models
{
    public class JWTokenVM
    {
        public int Status { get; set; }
        public string generateToken { get; set; }
        public string Message { get; set; }
    }
}
