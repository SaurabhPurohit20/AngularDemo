using AngularDemo2.Server.Context;
using AspNetCore.Reporting;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Text;

namespace AngularDemo2.Server.Controllers
{
	[Route("api/")]
	[ApiController]
	public class TestingController(IWebHostEnvironment webHostEnvironment, AngularDemoContext db) : ControllerBase
	{
		[HttpGet("report")]
		public IActionResult GetReport()
		{
			string rdlcPath = Path.Combine(webHostEnvironment.ContentRootPath, "wwwroot", "Reports", "Report.rdlc");

			if (!System.IO.File.Exists(rdlcPath)) return NotFound("Report file not found.");

			var cols = new[] { "CustomerID", "ContactName", "City", "Country" };

			DataTable dataTable = new();
			dataTable.Columns.AddRange(cols.Select(col => new DataColumn(col)).ToArray());

			for (int i = 0; i < 10; i++) dataTable.Rows.Add(i + "", "ContactName " + i, "City " + i, "Country " + i);

			LocalReport report = new(rdlcPath);
			report.AddDataSource("Customers", dataTable);
			Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

			return File(report.Execute(RenderType.Pdf).MainStream, "application/pdf");
		}

		[HttpPost("register")]
		public IActionResult Register([FromBody] RegisterModel rm)
		{
			db.TblUsers.Add(new()
			{
				Username = rm.Name,
				Password = rm.Password,
				Date = DateTime.Now,
				Status = 0,
			});
			db.SaveChanges();
			return Ok(new { e = false, msg = "Registered successfully", rm });
		}
	}
	public class RegisterModel
	{
		public string Name { get; set; } = "";
		public string Password { get; set; } = "";
	}
}
