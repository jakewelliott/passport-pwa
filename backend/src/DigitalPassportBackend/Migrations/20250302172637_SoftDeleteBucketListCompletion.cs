using System;
using System.Diagnostics.CodeAnalysis;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    [ExcludeFromCodeCoverage]
    public partial class SoftDeleteBucketListCompletion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "completed_bucket_list_items",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 2, 17, 26, 37, 45, DateTimeKind.Utc).AddTicks(1981), "10000.nXlE+qJIZmoO19TK7ldpVg==.TYcEgCKG+A+Vx46o+C9SGjN18ej5thWuE1q7K0Z4rK0=", new DateTime(2025, 3, 2, 17, 26, 37, 45, DateTimeKind.Utc).AddTicks(1963) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 2, 17, 26, 37, 47, DateTimeKind.Utc).AddTicks(3920), "10000.bQx81rcabJDRjLlzdPWHaA==.BTb9WB3VXZ7BMUbe1ON2OlkKHS1+2LpeLRieWMtcoMc=", new DateTime(2025, 3, 2, 17, 26, 37, 47, DateTimeKind.Utc).AddTicks(3893) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deleted",
                table: "completed_bucket_list_items");

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
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 2, 24, 16, 19, 39, 971, DateTimeKind.Utc).AddTicks(5610), "10000.5LykVywtLYwz2tkLhA8Cdw==.sfq8aBfR+2Y6JUOibWeSChphRELZGiu2QpfhUyoBn5I=", new DateTime(2025, 2, 24, 16, 19, 39, 971, DateTimeKind.Utc).AddTicks(5600) });
        }
    }
}
