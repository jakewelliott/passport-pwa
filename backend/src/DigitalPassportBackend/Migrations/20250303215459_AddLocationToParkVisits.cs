using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddLocationToParkVisits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Point>(
                name: "location",
                table: "park_visits",
                type: "point",
                nullable: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "location",
                table: "park_visits");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 3, 2, 5, 11, 789, DateTimeKind.Utc).AddTicks(2150), "10000.o2VoYATgep/fh9DP3xrbkA==.E99zQ2kZOIBNW8AnpUvWvum/CmyvdrMgLHsQP2N7g2k=", new DateTime(2025, 3, 3, 2, 5, 11, 789, DateTimeKind.Utc).AddTicks(2150) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 3, 2, 5, 11, 794, DateTimeKind.Utc).AddTicks(8510), "10000.cKDEubr6jeDPpVZji8Pj9w==.8xUNgeNH2F1t3w9eqypG8l7Rej5jWtJ9q3MoCEMjVe4=", new DateTime(2025, 3, 3, 2, 5, 11, 794, DateTimeKind.Utc).AddTicks(8500) });
        }
    }
}
