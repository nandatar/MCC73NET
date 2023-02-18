using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

    [Authorize]
    public class Dashboard : Controller
{
	public IActionResult Index()
	{
		return View();
	}
}
