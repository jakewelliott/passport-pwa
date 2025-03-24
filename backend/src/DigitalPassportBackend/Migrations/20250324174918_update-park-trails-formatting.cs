using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class updateparktrailsformatting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 24, 17, 49, 18, 94, DateTimeKind.Utc).AddTicks(4080), "10000.cjOS/lhchgz0zS0kPwUwsQ==.IZO0smr9XfBaSonwak27jxgAcpglvJ78xVhPI1UEtZI=", new DateTime(2025, 3, 24, 17, 49, 18, 94, DateTimeKind.Utc).AddTicks(4080) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 24, 17, 49, 18, 101, DateTimeKind.Utc).AddTicks(5140), "10000.weI/ssaBrA+rBt9eMDyiLg==.6qeJD0C+BiG6l6H2SL4Ez6wOEO3Apv/GDvfxH2eveU4=", new DateTime(2025, 3, 24, 17, 49, 18, 101, DateTimeKind.Utc).AddTicks(5140) });

            migrationBuilder.Sql(@"
            --  Auto-generated SQL script #202503241346
UPDATE digital_passport.parks
	SET trails='■ 10 trails

■ 2 Kids TRACK trails

Great Woodland Adventure Trail

Rumbling Bald Loop Trail

■ 6 miles of hiking

■ 1 mile of biking'
	WHERE id=3;
UPDATE digital_passport.parks
	SET trails='■ 8 trails

■ Kids TRACK Trail

Lake Trail

■ 4.4 miles of hiking

■ 3.7 miles of biking'
	WHERE id=5;
UPDATE digital_passport.parks
	SET trails='■ 11 trails

■ 3 Kids TRACK trails

Fern Trail

Lake Trail

Turnback Trail

■ 20 miles of hiking'
	WHERE id=6;
UPDATE digital_passport.parks
	SET trails='■ 10 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

Swamp Boardwalk

■ 21.5 miles of hiking

■ 20 miles of biking'
	WHERE id=7;
UPDATE digital_passport.parks
	SET trails='■ 4 trails

■ Kids TRACK Trail

Beech Tree Trail

■ 5.4 miles of hiking'
	WHERE id=8;
UPDATE digital_passport.parks
	SET trails='■ 18 trails

■ Kids TRACK Trail

Eno Trace Trail

■ 31 miles of hiking'
	WHERE id=9;
UPDATE digital_passport.parks
	SET trails='■ 15 trails

■ 2 Kids TRACK trails

Duck Cove

Rolling View

■ 25.2 miles of hiking

■ 14 miles of biking'
	WHERE id=10;
UPDATE digital_passport.parks
	SET trails='■ 5 paddle trails

■ 5 hiking trails

■ 4 miles of beach on Bear Island

■ Kids TRACK Trail

Live Oak Trail

■ 2.1 miles of hiking'
	WHERE id=17;
UPDATE digital_passport.parks
	SET trails='■ 27 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

Upper Cascades Trail

■ 48 miles of hiking

■ 14.8 miles of biking

■ 6 miles of horseback riding'
	WHERE id=18;
UPDATE digital_passport.parks
	SET trails='■ 5 trails

■ Kids TRACK Trail

9-hole disc golf course

■ 6.4 miles of hiking

2.4 miles at The Summit

4 miles at Iron Ore Belt'
	WHERE id=19;
UPDATE digital_passport.parks
	SET trails='■ 3 trails

■ Kids TRACK Trail

Tracks in the Sand Trail

■ 3 miles of hiking'
	WHERE id=20;
UPDATE digital_passport.parks
	SET trails='■ 8 trails

■ Kids TRACK Trail

Seaforth Pond Trail

■ 15 miles of hiking'
	WHERE id=22;
UPDATE digital_passport.parks
	SET trails='■ 4 trails

■ Kids TRACK Trail

Kerr Lake TRACK Trail

■ 3 miles of hiking'
	WHERE id=23;
UPDATE digital_passport.parks
	SET trails='■ 14 trails

■ Kids TRACK Trail

Overmountain Victory Trail

■ 32.6 miles of hiking

■ 20 miles of biking'
	WHERE id=24;
UPDATE digital_passport.parks
	SET trails='■ 13 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

Lake Shore Trail

■ 37.7 miles of hiking

■ 30.5 miles of biking'
	WHERE id=25;
UPDATE digital_passport.parks
	SET trails='■ 3 trails

■ Kids TRACK Trail

Lumber River TRACK Trail

■ 5 miles of hiking:

2 miles at Princess Ann access,

3 miles at Chalk Banks access'
	WHERE id=27;
UPDATE digital_passport.parks
	SET trails='■ 4 trails

■ Kids TRACK Trail

Mayo River TRACK Trail

■ 5.8 miles of hiking:

2 miles at Mayo Mountain access,

2.3 miles at Deshazo Mill access,

1.5 miles at Hickory Creek access'
	WHERE id=28;
UPDATE digital_passport.parks
	SET trails='■ 21 trails

■ 1 wheelchair-accessible trail

■ 1 Kids TRACK Trail

Habitat Adventure Trail

■ 31.3 miles of hiking

■ 12 miles of biking

■ 10 miles of horseback riding'
	WHERE id=29;
UPDATE digital_passport.parks
	SET trails='■ 5 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

Coleman Trail

■ 11.33 miles of hiking

■ 5 miles of biking

■ 1.25 miles of paddle trails'
	WHERE id=30;
UPDATE digital_passport.parks
	SET trails='■ 14 trails

■ Wheelchair-accessible overlook deck

■ Kids TRACK Trail

Quarry Trail

■ 54.6 miles of hiking

■ 33 miles of horseback riding'
	WHERE id=31;
UPDATE digital_passport.parks
	SET trails='■ 6 trails

■ Kids TRACK Trail

Rhododendron Trail

■ 4.65 miles of hiking'
	WHERE id=32;
UPDATE digital_passport.parks
	SET trails='■ 8 trails

■ Kids TRACK Trail

Balsam Nature Trail

■ 40 miles of hiking'
	WHERE id=33;
UPDATE digital_passport.parks
	SET trails='■ 12 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

Hickory Trail

■ 11.5 miles of hiking'
	WHERE id=34;
UPDATE digital_passport.parks
	SET trails='■ 15 trails

■ Kids TRACK Trail

Sassafras Trail

■ 28 miles of hiking

■ 9 miles of horseback riding'
	WHERE id=37;
UPDATE digital_passport.parks
	SET trails='■ 14 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

American Beech Trail

■ 32.9 miles of hiking

■ 13.5 miles of biking

■ 8 miles of horseback riding'
	WHERE id=38;
UPDATE digital_passport.parks
	SET trails='■ 1 trail

■ Kids TRACK Trail

CCC Loop Trail

■ 1 mile of hiking'
	WHERE id=40;
UPDATE digital_passport.parks
	SET trails='■ 23 trails

■ Kids TRACK Trail

River Trail

■ 51 miles of hiking

■ 16.2 miles of biking

■ 33.3 miles of horseback riding'
	WHERE id=41;
UPDATE digital_passport.parks
	SET trails='■ 9 trails

■ Kids TRACK Trail

0.75 mile on Stone Mountain Loop Trail

■ 28.75 miles of hiking

■ 10 miles of horseback riding'
	WHERE id=42;
UPDATE digital_passport.parks
	SET trails='■ 11 trails

■ Kids TRACK Trail

Pine Barrens Trail

■ 9.6 miles of hiking

■ 2.6 miles of horseback riding*

*No horse trailer parking available'
	WHERE id=43;
UPDATE digital_passport.parks
	SET trails='■ 10 trails

■ Kids TRACK Trail

Oak Rock Trail

■ 34 miles of hiking

■ 13 miles of biking

■ 13 miles of horseback riding'
	WHERE id=44;
UPDATE digital_passport.parks
	SET trails='■ 9 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail

follows Snow’s Cut Trail

■ 8.75 miles of hiking

■ 1 mile of biking'
	WHERE id=45;
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
                values: new object[] { new DateTime(2025, 3, 19, 8, 19, 1, 409, DateTimeKind.Utc).AddTicks(8540), "10000.Wlwlf1u9GPy0RXqWjUh2Vw==.dt/BTOgUPv4cFixnQ8+YCiJUnUfd1ANW19bS6NgDGKw=", new DateTime(2025, 3, 19, 8, 19, 1, 409, DateTimeKind.Utc).AddTicks(8530) });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "created_at", "password", "updated_at" },
                values: new object[] { new DateTime(2025, 3, 19, 8, 19, 1, 416, DateTimeKind.Utc).AddTicks(5500), "10000.hWIO5GUqAl7PzmsyOyiT3A==.Fmz3RxgQC+59pJzdwbnCMyp+3/Y+Ab2RPawHGsyZ/UE=", new DateTime(2025, 3, 19, 8, 19, 1, 416, DateTimeKind.Utc).AddTicks(5500) });
        }
    }
}
