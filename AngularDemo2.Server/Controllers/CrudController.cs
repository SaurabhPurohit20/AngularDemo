using AngularDemo2.Server.Context;
using Microsoft.AspNetCore.Mvc;

namespace AngularDemo2.Server.Controllers
{
	[Route("api/")]
	[ApiController]
	public class CrudController(AngularDemoContext db) : ControllerBase
	{
		[HttpGet("get")]
		public IActionResult Get()
		{
			var users = db.TblUsers.Select(x => new { x.Id, x.Username, x.Password, x.Date, x.Status });
			return Ok(users);
		}

		[HttpPost("insert")]
		public IActionResult Insert([FromBody] InsertModel rm)
		{
			var user = new TblUser
			{
				Username = rm.Username,
				Password = rm.Password,
				Date = DateTime.Now,
				Status = 0,
			};
			db.TblUsers.Add(user);
			db.SaveChanges();
			return Ok(new { user.Id, username = rm.Username, password = rm.Password });
		}

		[HttpPut("update")]
		public IActionResult Update([FromBody] UpdateModel rm)
		{
			var user = db.TblUsers.Where(x => x.Id == rm.Id).Single();
			user.Username = rm.Username;
			user.Password = rm.Password;
			user.Date = DateTime.Now;
			user.Status = 0;
			db.SaveChanges();
			return Ok(new { e = false, msg = "Updated successfully" });
		}

		[HttpDelete("delete/{id}")]
		public IActionResult Delete(int id)
		{
			db.TblUsers.Remove(db.TblUsers.Where(x => x.Id == id).Single());
			db.SaveChanges();
			return Ok(new { e = false, msg = "Deleted successfully" });
		}
	}
	public class InsertModel
	{
		public string Username { get; set; } = "";
		public string Password { get; set; } = "";
	}
	public class UpdateModel
	{
		public required int Id { get; set; }
		public string Username { get; set; } = "";
		public string Password { get; set; } = "";
	}
}
