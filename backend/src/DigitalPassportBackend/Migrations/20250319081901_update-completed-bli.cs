using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class updatecompletedbli : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_completed_bucket_list_items_parks_park",
                table: "completed_bucket_list_items");

            migrationBuilder.AlterColumn<int>(
                name: "park",
                table: "completed_bucket_list_items",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 19, 8, 19, 1, 409, DateTimeKind.Utc).AddTicks(8540), "10000.Wlwlf1u9GPy0RXqWjUh2Vw==.dt/BTOgUPv4cFixnQ8+YCiJUnUfd1ANW19bS6NgDGKw=", new DateTime(2025, 3, 19, 8, 19, 1, 409, DateTimeKind.Utc).AddTicks(8530) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 19, 8, 19, 1, 416, DateTimeKind.Utc).AddTicks(5500), "10000.hWIO5GUqAl7PzmsyOyiT3A==.Fmz3RxgQC+59pJzdwbnCMyp+3/Y+Ab2RPawHGsyZ/UE=", new DateTime(2025, 3, 19, 8, 19, 1, 416, DateTimeKind.Utc).AddTicks(5500) });

            migrationBuilder.AddForeignKey(
                name: "FK_completed_bucket_list_items_parks_park",
                table: "completed_bucket_list_items",
                column: "park",
                principalTable: "parks",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_completed_bucket_list_items_parks_park",
                table: "completed_bucket_list_items");

            migrationBuilder.AlterColumn<int>(
                name: "park",
                table: "completed_bucket_list_items",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 17, 6, 39, 52, 247, DateTimeKind.Utc).AddTicks(6080), "10000.n7RybXBNAG6QsBRv4hljlA==.8Cj4zTKiJAUMysvnwx6wSN0JHGYakvWpmcp0bYVwRSY=", new DateTime(2025, 3, 17, 6, 39, 52, 247, DateTimeKind.Utc).AddTicks(6080) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 17, 6, 39, 52, 253, DateTimeKind.Utc).AddTicks(8750), "10000.535uPRcATOk6NelbqgiYwA==.SUYSvM7hnvtJtHkIm38CZcd+NsKeAx6qf923pF+Ofcc=", new DateTime(2025, 3, 17, 6, 39, 52, 253, DateTimeKind.Utc).AddTicks(8730) });

            migrationBuilder.AddForeignKey(
                name: "FK_completed_bucket_list_items_parks_park",
                table: "completed_bucket_list_items",
                column: "park",
                principalTable: "parks",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
