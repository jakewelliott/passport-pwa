using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTooltipToTrailIcons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "tooltip",
                table: "trail_icons",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
                
            // Update trail_icons tooltips based on icon names
            migrationBuilder.Sql(@"
                UPDATE trail_icons SET tooltip = 
                CASE 
                    WHEN icon = 'FourWDBeach' THEN '4WD Beach Access'
                    WHEN icon = 'Accessible' THEN 'Accessible Facilities'
                    WHEN icon = 'Amphiteater' THEN 'Amphitheater'
                    WHEN icon = 'BackpackCamping' THEN 'Backpack Camping'
                    WHEN icon = 'Bathhouse' THEN 'Bathhouse'
                    WHEN icon = 'Biking' THEN 'Biking Trails'
                    WHEN icon = 'BoatRamp' THEN 'Boat Ramp'
                    WHEN icon = 'Boating' THEN 'Boating Activities'
                    WHEN icon = 'CamperCabin' THEN 'Camper Cabin'
                    WHEN icon = 'Camping' THEN 'Camping Area'
                    WHEN icon = 'DumpStation' THEN 'Dump Station'
                    WHEN icon = 'ElectricHookup' THEN 'Electric Hookup'
                    WHEN icon = 'ElectricWaterHookups' THEN 'Electric and Water Hookups'
                    WHEN icon = 'EquestrianCamping' THEN 'Equestrian Camping'
                    WHEN icon = 'Firewood' THEN 'Firewood Available'
                    WHEN icon = 'Fishing' THEN 'Fishing Opportunities'
                    WHEN icon = 'GroupCamp' THEN 'Group Camping Area'
                    WHEN icon = 'Hiking' THEN 'Hiking Trails'
                    WHEN icon = 'HorseTrailerParking' THEN 'Horse Trailer Parking'
                    WHEN icon = 'HorsebackRiding' THEN 'Horseback Riding'
                    WHEN icon = 'Hospital' THEN 'Nearby Hospital'
                    WHEN icon = 'IE_Exhibits' THEN 'IE Exhibits'
                    WHEN icon = 'Information' THEN 'Information Center'
                    WHEN icon = 'Marina' THEN 'Marina Facilities'
                    WHEN icon = 'PaddleInCamping' THEN 'Paddle-In Camping'
                    WHEN icon = 'Paddling' THEN 'Paddling'
                    WHEN icon = 'ParkGate' THEN 'Park Gate'
                    WHEN icon = 'Picnic' THEN 'Picnic'
                    WHEN icon = 'PicnicShelter' THEN 'Picnic Shelter'
                    WHEN icon = 'PointofInterest' THEN 'Point of Interest'
                    WHEN icon = 'PrimitiveCabin' THEN 'Primitive Cabin'
                    WHEN icon = 'Restroom' THEN 'Restroom'
                    WHEN icon = 'RockClimbing' THEN 'Rock Climbing'
                    WHEN icon = 'SewerHookup' THEN 'Sewer Hookup'
                    WHEN icon = 'Swimming' THEN 'Swimming'
                    WHEN icon = 'TRACKTrail' THEN 'TRACK Trail'
                    WHEN icon = 'TentTrailerCamping' THEN 'Tent and Trailer Camping'
                    WHEN icon = 'VacationCabin' THEN 'Vacation Cabin'
                    WHEN icon = 'ViewingSymbol' THEN 'Viewing Area'
                    WHEN icon = 'VisitorCenter' THEN 'Visitor Center'
                    WHEN icon = 'WaterHookup' THEN 'Water Hookup'
                    WHEN icon = 'WaterSpigot' THEN 'Water Spigot'
                    ELSE NULL
                END;
            ");
            

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 14, 53, 43, 998, DateTimeKind.Utc).AddTicks(130), "10000.XtEHv/6nm+T19U2KtVxE4w==./ZFslcsMvlrgo05ZlKBtDM/WYs4FVfV5P60OiJ1xV8o=", new DateTime(2025, 4, 1, 14, 53, 43, 998, DateTimeKind.Utc).AddTicks(110) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 4, 1, 14, 53, 44, 3, DateTimeKind.Utc).AddTicks(5490), "10000.ZwmQBTK7e8t0zVyADVxS0w==.rU7JkPNjjtfIxmDJDVCA2MfT5gmNClFO6v9u30FcoOs=", new DateTime(2025, 4, 1, 14, 53, 44, 3, DateTimeKind.Utc).AddTicks(5480) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tooltip",
                table: "trail_icons");

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
        }
    }
}
