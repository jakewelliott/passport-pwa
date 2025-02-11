using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitializeAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "created_at", "password", "role", "updated_at", "username" },
                values: new object[] { 1, new DateTime(2025, 2, 10, 0, 1, 48, 361, DateTimeKind.Utc).AddTicks(4130), "10000.W8QErvwJ94AvgfYwFpWiVw==.NBzuowM3sOx7dBKmq35kI6UZaZAR3ZLN44ehkZMcN1w=", "admin", new DateTime(2025, 2, 10, 0, 1, 48, 361, DateTimeKind.Utc).AddTicks(4130), "superAdmin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 1);
        }
    }
}
