using System;
using System.Diagnostics.CodeAnalysis;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    [ExcludeFromCodeCoverage]
    public partial class FixVisitorRoleAndPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 2, 24, 16, 19, 39, 965, DateTimeKind.Utc).AddTicks(700), "10000.+BpWBgK4g+t9PhXew0mJaw==.I7DoHtw5UKW7n7tXEJq4VzgztoTJTR1oWltkefGvrSU=", new DateTime(2025, 2, 24, 16, 19, 39, 965, DateTimeKind.Utc).AddTicks(680) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "role", "updated_at" },
                values: new object[] { new DateTime(2025, 2, 24, 16, 19, 39, 971, DateTimeKind.Utc).AddTicks(5610), "10000.5LykVywtLYwz2tkLhA8Cdw==.sfq8aBfR+2Y6JUOibWeSChphRELZGiu2QpfhUyoBn5I=", "visitor", new DateTime(2025, 2, 24, 16, 19, 39, 971, DateTimeKind.Utc).AddTicks(5600) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 2, 21, 10, 27, 17, 336, DateTimeKind.Utc).AddTicks(4320), "10000.WnLaO+/0z4EAIFWgEor+Fg==.ftzzXHqpKbJkVZlVxcnN2EPjsVnRSZv9J9yAjUizpLo=", new DateTime(2025, 2, 21, 10, 27, 17, 336, DateTimeKind.Utc).AddTicks(4310) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "role", "updated_at" },
                values: new object[] { new DateTime(2025, 2, 21, 10, 27, 17, 342, DateTimeKind.Utc).AddTicks(8800), "10000.WnLaO+/0z4EAIFWgEor+Fg==.ftzzXHqpKbJkVZlVxcnN2EPjsVnRSZv9J9yAjUizpLo=", "admin", new DateTime(2025, 2, 21, 10, 27, 17, 342, DateTimeKind.Utc).AddTicks(8800) });
        }
    }
}
