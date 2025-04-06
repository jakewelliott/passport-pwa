using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class parkfavorites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "favorite_parks",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: true),
                    user = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favorite_parks", x => x.id);
                    table.ForeignKey(
                        name: "FK_favorite_parks_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_favorite_parks_users_user",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 3, 12, 31, 323, DateTimeKind.Utc).AddTicks(2060), "10000./pUMPcgjbpUd/WEM02DF8A==.7tSgWm0JvxgqVUFyxCqUQXwEuBHnap2RJ1Qx8FNy2Pc=", new DateTime(2025, 4, 1, 3, 12, 31, 323, DateTimeKind.Utc).AddTicks(2050) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 3, 12, 31, 330, DateTimeKind.Utc).AddTicks(1100), "10000.GiJwrDRtYPW51ZQuiDeVqQ==.xE5XWDsMX2+ugrSmFdVfk5ys4oSK5e1Mb45ibc5l7jk=", new DateTime(2025, 4, 1, 3, 12, 31, 330, DateTimeKind.Utc).AddTicks(1100) });

            migrationBuilder.CreateIndex(
                name: "IX_favorite_parks_park",
                table: "favorite_parks",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_favorite_parks_user",
                table: "favorite_parks",
                column: "user");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favorite_parks");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 26, 18, 46, 53, 29, DateTimeKind.Utc).AddTicks(710), "10000.Djzl362OL0d24wpTrraO+A==.6LmG9N8CY7ZdZSU9gzMDbO4prHs4PVvFFUvZgLcThxA=", new DateTime(2025, 3, 26, 18, 46, 53, 29, DateTimeKind.Utc).AddTicks(700) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 26, 18, 46, 53, 35, DateTimeKind.Utc).AddTicks(8540), "10000.+pauWaD7luEjnPyAHFEl1Q==.IYy48oeQ2UBBbDEMnuadDLI1Bp/Xjsmcyn+KICtI1Fk=", new DateTime(2025, 3, 26, 18, 46, 53, 35, DateTimeKind.Utc).AddTicks(8540) });
        }
    }
}
