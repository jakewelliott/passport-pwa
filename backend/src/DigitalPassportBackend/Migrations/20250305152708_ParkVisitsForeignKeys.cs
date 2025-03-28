using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class ParkVisitsForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 5, 15, 27, 7, 992, DateTimeKind.Utc).AddTicks(270), "10000.Z6vTy3wzZBItk1d6yyY8xw==.lFJb77uKT6YcbeSU48b5gG+cKNfWmb208wl720PUf4Y=", new DateTime(2025, 3, 5, 15, 27, 7, 992, DateTimeKind.Utc).AddTicks(270) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 5, 15, 27, 7, 997, DateTimeKind.Utc).AddTicks(5230), "10000.v51+32AJcjnVX3nRrECmsA==.8XQBVAv8RtkTyRp9oCs+f0sMsxW0ytt5Eh+1lKJs6Ls=", new DateTime(2025, 3, 5, 15, 27, 7, 997, DateTimeKind.Utc).AddTicks(5220) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 3, 21, 54, 58, 875, DateTimeKind.Utc).AddTicks(8280), "10000.eslP35YqvDc0NqRDH7yZLA==.G+HwYnZWp37huH8Yatipi66XN7yWGxCuAEwywd15iEg=", new DateTime(2025, 3, 3, 21, 54, 58, 875, DateTimeKind.Utc).AddTicks(8280) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 3, 21, 54, 58, 881, DateTimeKind.Utc).AddTicks(1870), "10000.Vq7vZ+sjhkoYrgQ9qQA4mw==.ZzRze88z4lC/+IuRmFUU73LOBiG/zuCobfJ3CjuCJLI=", new DateTime(2025, 3, 3, 21, 54, 58, 881, DateTimeKind.Utc).AddTicks(1860) });
        }
    }
}
