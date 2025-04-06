using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTooltipToParkIcons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 14, 31, 55, 185, DateTimeKind.Utc).AddTicks(1850), "10000.xvQNZNsPypw63B0NpCnvHg==.lnVhiRbL56E5o/eufN7MdgNv0Cy8E3clizS/WS0BxpU=", new DateTime(2025, 4, 1, 14, 31, 55, 185, DateTimeKind.Utc).AddTicks(1850) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 14, 31, 55, 191, DateTimeKind.Utc).AddTicks(4700), "10000.qFqsE7ISmiGAtsIN/FrqgQ==.mZOWkLhBcSvluRdI06JCioEde1bHGQGuwx6vS3TaoPA=", new DateTime(2025, 4, 1, 14, 31, 55, 191, DateTimeKind.Utc).AddTicks(4680) });

            // Add tooltip column to park_icons table
            migrationBuilder.AddColumn<string>(
                name: "tooltip",
                table: "park_icons",
                type: "text",
                nullable: true);
                
            // Update tooltips based on icon names
            migrationBuilder.Sql(@"
                UPDATE park_icons SET tooltip = 
                CASE 
                    -- Red Icons
                    WHEN icon = 'Biking_Red' THEN 'Biking'
                    WHEN icon = 'Fishing_Red' THEN 'Fishing'
                    WHEN icon = 'Hiking_Red' THEN 'Hiking'
                    WHEN icon = 'HorsebackRiding_Red' THEN 'Horseback Riding'
                    WHEN icon = 'Paddling_Red' THEN 'Paddling'
                    WHEN icon = 'Picnicking_Red' THEN 'Picnicking'
                    WHEN icon = 'RockClimbing_Red' THEN 'Rock Climbing'
                    WHEN icon = 'Swimming_Red' THEN 'Swimming'
                    
                    -- Blue Icons
                    WHEN icon = 'BoatRamp_Blue' THEN 'Boat Ramp'
                    WHEN icon = 'BoatRental_Blue' THEN 'Boat Rental'
                    WHEN icon = 'Exhibits_Blue' THEN 'Exhibits'
                    WHEN icon = 'Playground_Blue' THEN 'Playground'
                    WHEN icon = 'VisitorCenter_Blue' THEN 'Visitor Center'
                    
                    -- Green Icons
                    WHEN icon = 'CamperCabins_Green' THEN 'Camper Cabins'
                    WHEN icon = 'Camping_Green' THEN 'Camping'
                    WHEN icon = 'CanoeinCamping_Green' THEN 'Canoe-in Camping'
                    WHEN icon = 'EquestrianCamping_Green' THEN 'Equestrian Camping'
                    WHEN icon = 'GroupCabins_Green' THEN 'Group Cabins'
                    WHEN icon = 'GroupCamp_Green' THEN 'Group Camping'
                    WHEN icon = 'PrimitiveCabin_Green' THEN 'Primitive Cabin'
                    WHEN icon = 'RVCamping_Green' THEN 'RV Camping'
                    WHEN icon = 'VacationCabin_Green' THEN 'Vacation Cabin'
                    
                    -- Black Icons
                    WHEN icon = 'Camping_Black' THEN 'Camping Sites'
                    WHEN icon = 'PicnicShelter_Black' THEN 'Picnic Shelter'
                    
                    -- Blaze Icons
                    WHEN icon = 'FBST_Blaze' THEN 'French Broad State Trail'
                    WHEN icon = 'FFST_Blaze' THEN 'Fontana Lake State Trail'
                    WHEN icon = 'HGST_Blaze' THEN 'Hickory Nut Gorge State Trail'
                    WHEN icon = 'MST_Blaze' THEN 'Mountains-to-Sea State Trail'
                    WHEN icon = 'YRST_Blaze' THEN 'Yadkin River State Trail'
                    
                    ELSE NULL
                END;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

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

            migrationBuilder.DropColumn(
                name: "tooltip",
                table: "park_icons");
        }
    }
}
