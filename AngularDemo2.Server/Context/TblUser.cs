using System;
using System.Collections.Generic;

namespace AngularDemo2.Server.Context;

public partial class TblUser
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public DateTime? Date { get; set; }

    public short? Status { get; set; }
}
