using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class LatihanCssController : Controller
{
    //[Authorize(Roles = "Admin, Manager")]
    public IActionResult Index()
    {
        return View();
    }
	public IActionResult Pokemon()
	{
		return View();
	}
}
