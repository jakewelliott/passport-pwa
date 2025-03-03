using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddDeletedColumnToCompletedBucketListItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "completed_bucket_list_items",
                type: "tinyint(1)",
                nullable: true,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deleted",
                table: "completed_bucket_list_items");
        }
    }
}
