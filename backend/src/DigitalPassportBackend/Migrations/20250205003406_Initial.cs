using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace DigitalPassportBackend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "parks",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    park_abbreviation = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    park_type = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    park_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    city = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    coordinates = table.Column<Point>(type: "point", nullable: true),
                    phone = table.Column<long>(type: "bigint", nullable: true),
                    email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    stamp_image = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    established_year = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    landmark = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    you_can_find = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    trails = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    boundaries = table.Column<Polygon>(type: "polygon", nullable: true),
                    accesses = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    website = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parks", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "trails",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    trail_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    length = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_trails", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    role = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "bucket_list_items",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    task = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bucket_list_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_bucket_list_items_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "park_addresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    address_line_one = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    address_line_two = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    city = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    state = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    zipcode = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_park_addresses", x => x.id);
                    table.ForeignKey(
                        name: "FK_park_addresses_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "park_icons",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    icon = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_park_icons", x => x.id);
                    table.ForeignKey(
                        name: "FK_park_icons_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "park_photos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    photo = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    alt = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_park_photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_park_photos_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "trail_icons",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    icon = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    trail = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_trail_icons", x => x.id);
                    table.ForeignKey(
                        name: "FK_trail_icons_trails_trail",
                        column: x => x.trail,
                        principalTable: "trails",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "collected_stamps",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    method = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    location = table.Column<Point>(type: "point", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    user = table.Column<int>(type: "int", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_collected_stamps", x => x.id);
                    table.ForeignKey(
                        name: "FK_collected_stamps_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_collected_stamps_users_user",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "park_visits",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false),
                    user = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_park_visits", x => x.id);
                    table.ForeignKey(
                        name: "FK_park_visits_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_park_visits_users_user",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "private_notes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    note = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: true),
                    user = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_private_notes", x => x.id);
                    table.ForeignKey(
                        name: "FK_private_notes_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_private_notes_users_user",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "completed_bucket_list_items",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    location = table.Column<Point>(type: "point", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    park = table.Column<int>(type: "int", nullable: false),
                    bucket_list_item = table.Column<int>(type: "int", nullable: false),
                    user = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_completed_bucket_list_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_completed_bucket_list_items_bucket_list_items_bucket_list_it~",
                        column: x => x.bucket_list_item,
                        principalTable: "bucket_list_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_completed_bucket_list_items_parks_park",
                        column: x => x.park,
                        principalTable: "parks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_completed_bucket_list_items_users_user",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_bucket_list_items_park",
                table: "bucket_list_items",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_collected_stamps_park",
                table: "collected_stamps",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_collected_stamps_user",
                table: "collected_stamps",
                column: "user");

            migrationBuilder.CreateIndex(
                name: "IX_completed_bucket_list_items_bucket_list_item",
                table: "completed_bucket_list_items",
                column: "bucket_list_item");

            migrationBuilder.CreateIndex(
                name: "IX_completed_bucket_list_items_park",
                table: "completed_bucket_list_items",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_completed_bucket_list_items_user",
                table: "completed_bucket_list_items",
                column: "user");

            migrationBuilder.CreateIndex(
                name: "IX_park_addresses_park",
                table: "park_addresses",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_park_icons_park",
                table: "park_icons",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_park_photos_park",
                table: "park_photos",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_park_visits_park",
                table: "park_visits",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_park_visits_user",
                table: "park_visits",
                column: "user");

            migrationBuilder.CreateIndex(
                name: "IX_private_notes_park",
                table: "private_notes",
                column: "park");

            migrationBuilder.CreateIndex(
                name: "IX_private_notes_user",
                table: "private_notes",
                column: "user");

            migrationBuilder.CreateIndex(
                name: "IX_trail_icons_trail",
                table: "trail_icons",
                column: "trail");

            migrationBuilder.Sql(@"
            INSERT INTO parks (id,park_abbreviation,park_type,park_name,city,coordinates,phone,email,stamp_image,established_year,landmark,you_can_find,trails,boundaries,updated_at,created_at,accesses,website) VALUES
	 (3,'CHRO','SPA','Chimney Rock State Park','Chimney Rock',ST_GeomFromText('POINT (-82.2485 35.4398)'),8286251823,'chimney.rock@ncparks.gov','CHRO.svg','2005','Chimney Rock, a 315-foot rock that looks like a chimney and has views of Hickory Nut Gorge and Lake Lure','the magnificent peregrine falcon and the white irisette, an endangered herb with small white flowers.','■ 10 trails

■ 2 Kids TRACK trails (Great Woodland Adventure Trail and Rumbling Bald Loop Trail)

■ 6 miles of hiking

 ■ 1 mile of biking',NULL,'2025-01-30 13:45:28','2025-01-30 00:17:04','Chimney Rock* and Rumbling Bald access areas
*fee charged at main/attraction access','https://www.ncparks.gov/state-parks/chimney-rock-state-park'),
	 (4,'CACR','SPA','Carvers Creek State Park','Spring Lake',ST_GeomFromText('POINT (-78.9761 35.2023)'),9104364681,'carvers.creek@ncparks.gov','CACR.svg','2005','Long Valley Farm and the Rockefeller House, the winter vacation home of James Stillman Rockefeller, a member of the prominent family','longleaf pines, the federally endangered red-cockaded woodpecker, and the rare Pine Barrens tree frog.','■ 9 trails

■ 13.3 miles of hiking:

2.8 miles at Long Valley Farm

10.5 miles at Sandhills access

■ 10.5 miles of horseback riding

■ 13.3 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 00:24:58','Long Valley Farm and Sandhills access areas','https://www.ncparks.gov/state-parks/carvers-creek-state-park'),
	 (5,'CLNE','SPA','Cliffs of the Neuse State Park','Seven Springs',ST_GeomFromText('POINT (-77.8907 35.2358)'),9197786234,'cliffs.neuse@ncparks.gov','CLNE.svg','1945','The Overlook, a 90-foot steep cliff rising above the Neuse River','the eastern fox squirrel, which lives in the park’s longleaf pine forests, and galax – a plant usually found in the mountains.','■ 8 trails

■ Kids TRACK Trail (Lake Trail)

■ 4.4 miles of hiking

■ 3.7 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 00:27:02','','https://www.ncparks.gov/state-parks/cliffs-neuse-state-park'),
	 (6,'CRMO','SPA','Crowders Mountain State Park','Kings Mountain',ST_GeomFromText('POINT (-81.2935 35.2133)'),7048535375,'crowders.mountain@ncparks.gov','CRMO.svg','1973','Two peaks, The Pinnacle and Crowders Mountain, that offer 25-mile views of the surrounding Piedmont','a lot of different bird species, from small songbirds to red-tailed hawks and turkey vultures.','■ 11 trails

■ 3 Kids TRACK trails (Fern, Lake, and Turnback trails)

■ 20 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 00:29:00','Sparrow Springs, Linwood Road, and Boulders access areas','https://www.ncparks.gov/state-parks/crowders-mountain-state-park'),
	 (7,'DISW','SPA','Dismal Swamp State Park','South Mills',ST_GeomFromText('POINT (-76.3551 36.5057)'),2527716593,'dismal.swamp@ncparks.gov','DISW.svg','1974','The mark a 2011 wildfire left on the park that can be seen from the Corapeake Road and Forest Line Road intersection','the Atlantic white cedar tree, where the rare Hessel’s hairstreak butterfly likes to live.','■ 10 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (Swamp Boardwalk)

■ 21.5 miles of hiking

■ 20 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 00:32:45','','https://www.ncparks.gov/state-parks/dismal-swamp-state-park'),
	 (8,'ELKN','SPA','Elk Knob State Park','Todd',ST_GeomFromText('POINT (-81.6959 36.3325)'),8282977261,'elk.knob@ncparks.gov','ELKN.svg','2003','The summit, one of the highest peaks in North Carolina’s High Country, offering views of surrounding mountains','flame azaleas, which make the mountaintop look like it is on fire in the middle of June.','■ 4 trails

■ Kids TRACK Trail (Beech Tree Trail)

■ 5.4 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 00:35:30','','https://www.ncparks.gov/state-parks/elk-knob-state-park'),
	 (9,'ENRI','SPA','Eno River State Park','Durham',ST_GeomFromText('POINT (-79.0057 36.0757)'),9842501370,'eno.river@ncparks.gov','ENRI.svg','1972','The Cascades, a rock formation in the middle of the river located just upstream from Fews Ford','white-tailed deer and a shallow, rocky, river corridor in upland forests.','■ 18 trails

■ Kids TRACK Trail (Eno Trace Trail)

■ 31 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 00:37:15','Fews Ford, Cabelands, Cole Mill, Pleasant Green, and Pump Station access areas','https://www.ncparks.gov/state-parks/eno-river-state-park'),
	 (10,'FALA','SRA','Falls Lake State Recreation Area','Wake Forest',ST_GeomFromText('POINT (-78.6857 36.0174)'),9848678000,'falls.lake@ncparks.gov','FALA.svg','1982','Falls Lake, an undeveloped, 12,000-acre reservoir, with 7 access areas','monarch butterflies, which pass through the park in the spring and fall during their migration south to Mexico.','■ 15 trails

■ 2 Kids TRACK trails (Duck Cove, Rolling View)

■ 25.2 miles of hiking

■ 14 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 01:01:30','Visitor Center, Beaverdam, Highway 50, and Sandling day-use areas; B.W. Wells, Holly Point and Shinleaf campgrounds; Rolling View day-use area and campground','https://www.ncparks.gov/state-parks/falls-lake-state-recreation-area'),
	 (11,'FOFI','SRA','Fort Fisher State Recreation Area','Kure Beach',ST_GeomFromText('POINT (-77.9224 33.9644)'),9104585798,'fort.fisher@ncparks.gov','FOFI.svg','1986','The observation deck at the end of the Basin Trail, a great spot for birdwatching and viewing Zeke’s Island and the Cape Fear River','loggerhead sea turtles, which nest on the shoreline.','■ 1 trail

■ 1 mile of hiking

■ 5 miles of beach access

■ 4-wheel-drive beach access',NULL,'2025-01-30 13:45:28','2025-01-30 01:03:38','','https://www.ncparks.gov/state-parks/fort-fisher-state-recreation-area'),
	 (12,'FOMA','SPA','Fort Macon State Park','Atlantic Beach',ST_GeomFromText('POINT (-76.6783 34.6979)'),2527263775,'fort.macon@ncparks.gov','FOMA.svg','1924','A restored 19th century-era fort that has cannon and musket demonstrations and guided tours','a diverse barrier island habitat and the painted bunting, a beautiful rainbow-colored bird of the cardinal family.','■ 3 trails

■ 3.9 miles of hiking

■ 3.9 miles of biking

■ 1.5 miles of beach access',NULL,'2025-01-30 13:45:28','2025-01-30 01:05:19','','https://www.ncparks.gov/state-parks/fort-macon-state-park');
INSERT INTO parks (id,park_abbreviation,park_type,park_name,city,coordinates,phone,email,stamp_image,established_year,landmark,you_can_find,trails,boundaries,updated_at,created_at,accesses,website) VALUES
	 (13,'GOCR','SPA','Goose Creek State Park','Washington',ST_GeomFromText('POINT (-76.9018 35.4781)'),2529232191,'goose.creek@ncparks.gov','GOCR.svg','1974','A large live oak tree found on the Live Oak Trail, with branches shading the Pamlico River','the great blue heron and the green tree frog.','■ 9 trails

■ 1 wheelchair-accessible trail

■ 9.7 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 01:07:49','Main Entrance and Dinah’s access areas','https://www.ncparks.gov/state-parks/goose-creek-state-park'),
	 (15,'GORG','SPA','Gorges State Park','Sapphire',ST_GeomFromText('POINT (-82.9505 35.0965)'),8289669099,'gorges@ncparks.gov','GORG.svg','1999','Over 20 waterfalls hidden along the Blue Ridge Escarpment','over 8,000 acres of temperate rainforest where many different plants and animals live, including Carolina starmoss and the gorge filmy fern.','■ 13 trails

■ 56 miles of hiking

■ 17 miles of biking

■ 12 miles of horseback riding

■ Access to 77 miles of hiking via the Foothills Trail',NULL,'2025-01-30 13:45:28','2025-01-30 01:12:08','Grassy Ridge and Frozen Creek access areas','https://www.ncparks.gov/state-parks/gorges-state-park'),
	 (16,'GRMO','SPA','Grandfather Mountain State Park','Banner Elk',ST_GeomFromText('POINT (-81.835 36.1197)'),8289639522,'grandfather.mountain@ncparks.gov','GRMO.svg','2009','Grandfather Profile, visible from the Profile Trail in the mountain’s backcountry','peregrine falcons, ravens, plus over 70 species of rare, threatened and endangered plants and animals; more than a dozen distinct ecological zones; and the United Nations International Biosphere Reserve.','■ 8 trails

■ 13.3 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 01:19:23','Profile Trail; <b>National Park Service accesses</b>: Asutsi Trail, Boone Fork; <b>privately owned</b>: Grandfather Mountain attraction (fee charged)','https://www.ncparks.gov/state-parks/grandfather-mountain-state-park'),
	 (17,'HABE','SPA','Hammocks Beach State Park','Swansboro',ST_GeomFromText('POINT (-77.1429 34.671)'),9103264881,'hammocks.beach@ncparks.gov','HABE.svg','1961','Bear Island, a 4-mile long, undeveloped barrier island','sea turtle nests, particularly loggerhead turtles, who nest on the beach of Bear Island*.
*Disturbing sea turtle nests is a federal crime.','■ 5 paddle trails

■ 5 hiking trails

■ 4 miles of beach on Bear Island

■ Kids TRACK Trail (Live Oak Trail)

■ 2.1 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 01:22:17','','https://www.ncparks.gov/state-parks/hammocks-beach-state-park'),
	 (18,'HARO','SPA','Hanging Rock State Park','Danbury',ST_GeomFromText('POINT (-80.2662 36.3948)'),3365938480,'hanging.rock@ncparks.gov','HARO.svg','1936','Hanging Rock, offering great views of the surrounding Sauratown Mountains','the federally endangered Schweinitz’s sunflower and Wehrle’s salamander, which is found only in this area of the state.','■ 27 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (Upper Cascades Trail)

■ 48 miles of hiking

■ 14.8 miles of biking

■ 6 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 02:21:57','Main Entrance, Climbing, Dan River, Lower Cascades, Mountain Bike, and Tory’s Den access areas','https://www.ncparks.gov/state-parks/hanging-rock-state-park'),
	 (19,'HARI','SPA','Haw River State Park','Browns Summit',ST_GeomFromText('POINT (-79.7563 36.2508)'),3363426163,'haw.river@ncparks.gov','HARI.svg','2005 – as NC’s first residential environmental education center','Wetlands boardwalk leading to the start of Haw River','a floodplain swamp, the great blue heron, wood ducks and other water birds, and a variety of reptiles and amphibians.','■ 5 trails

■ Kids TRACK Trail (9-hole disc golf course)

■ 6.4 miles of hiking
2.4 miles at The Summit
4 miles at Iron Ore Belt',NULL,'2025-01-30 13:45:28','2025-01-30 02:35:26','The Summit and Iron Ore Belt access areas','https://www.ncparks.gov/state-parks/haw-river-state-park'),
	 (20,'JORI','SPA','Jockey''s Ridge State Park','Nags Head',ST_GeomFromText('POINT (-75.633 35.9642)'),2525736108,'jockeys.ridge@ncparks.gov','JORI.svg','1975','The tallest living sand dune on the East Coast','the gray fox, American beach grass, and fulgurites — glass tubes formed when lightning hits the sand.*
*If you find a fulgurite, please turn it in to the visitor center.','■ 3 trails

■ Kids TRACK Trail (Tracks in the Sand Trail)

■ 3 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 02:39:50','Main Entrance and soundside access areas','https://www.ncparks.gov/state-parks/jockeys-ridge-state-park'),
	 (21,'JONE','SPA','Jones Lake State Park','Elizabethtown',ST_GeomFromText('POINT (-78.5954 34.6827)'),9105884550,'jones.lake@ncparks.gov','JONE.svg','1939','Two lakes formed by the mysterious geological phenomenon known as Carolina bays: Jones Lake and Salters Lake','the red-cockaded woodpecker, an endangered species that lives in the bay forest.','■ 3 trails

■ 6 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 02:41:49','','https://www.ncparks.gov/state-parks/jones-lake-state-park'),
	 (22,'JORD','SRA','Jordan Lake State Recreation Area','Apex',ST_GeomFromText('POINT (-79.0167 35.7325)'),9193620586,'jordan.lake@ncparks.gov','JORD.svg','1981','Jordan Lake, an undeveloped, 14,000-acre reservoir with 8 access areas','the bald eagle: Jordan Lake is one of the largest summertime homes of the magnificent bird.','■ 8 trails

■ Kids TRACK Trail (Seaforth Pond Trail)

■ 15 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 02:44:32','Visitor Center; Crosswinds, Parkers Creek, Poplar Point, and Vista Point campgrounds; Ebenezer Church, New Hope Overlook, and Seaforth day-use areas; White Oak recreation area','https://www.ncparks.gov/state-parks/jordan-lake-state-recreation-area'),
	 (23,'KELA','SRA','Kerr Lake State Recreation Area','Henderson',ST_GeomFromText('POINT (-78.3664 36.4404)'),2524387791,'kerr.lake@ncparks.gov','KELA.svg','1975','John H. Kerr Reservoir, a 50,000-acre lake with over 800 miles of shoreline','osprey and the American hazelnut (nutbush), which Nutbush Creek is named after.','■ 4 trails

■ Kids TRACK Trail (Kerr Lake TRACK Trail)

■ 3 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 02:46:37','Satterwhite Point, Bullocksville, County Line, Henderson Point, Hibernia, J.C. Cooper Camp, Kimball Point and, Nutbush Bridge access areas','https://www.ncparks.gov/state-parks/kerr-lake-state-recreation-area');
INSERT INTO parks (id,park_abbreviation,park_type,park_name,city,coordinates,phone,email,stamp_image,established_year,landmark,you_can_find,trails,boundaries,updated_at,created_at,accesses,website) VALUES
	 (24,'LAJA','SPA','Lake James State Park','Nebo',ST_GeomFromText('POINT (-81.892 35.0378)'),8285446800,'lake.james@ncparks.gov','LAJA.svg','1987','The Cove Bridge that crosses the Mill’s Creek Cove and has views of Shortoff Mountain and South Mountains State Park.','bald eagles: Lake James has a big population of eagles throughout the year, including a place that eagles have used for nesting for over 10 years.','■ 14 trails

■ Kids TRACK Trail (Overmountain Victory Trail)

■ 32.6 miles of hiking

■ 20 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 02:51:26','Paddy’s Creek and Catawba River accesses and Fonta Flora State Trail','https://www.ncparks.gov/state-parks/lake-james-state-park'),
	 (25,'LANO','SPA','Lake Norman State Park','Troutman',ST_GeomFromText('POINT (-80.9325 35.6725)'),7045286350,'lake.norman@ncparks.gov','LANO.svg','1962','Lake Norman, which has over 520 miles of shoreline to explore','the great blue heron; one of the islands on Lake Norman is a major heron nesting site, with over 10 pairs of nesting herons.','■ 13 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (Lake Shore Trail)

■ 37.7 miles of hiking

■ 30.5 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 02:57:05','','https://www.ncparks.gov/state-parks/lake-norman-state-park'),
	 (26,'LAWA','SPA','Lake Waccamaw State Park','Lake Waccamaw',ST_GeomFromText('POINT (-78.4654 34.279)'),9106464748,'lake.waccamaw@ncparks.gov','LAWA.svg','1976','Waccamaw Dam, which is the start of the Waccamaw River. It flows 150 miles south into South Carolina.','the American alligator and a 2.75 million year old fossilized whale skull.','■ 6 trails

■ 1 wheelchair-accessible trail

■ 10 miles of hiking, including a new bridge to cross the dam',NULL,'2025-01-30 13:45:28','2025-01-30 03:00:18','','https://www.ncparks.gov/state-parks/lake-waccamaw-state-park'),
	 (27,'LURI','SPA','Lumber River State Park','Orrum',ST_GeomFromText('POINT (-79.0022 34.39)'),9106284564,'lumber.river@ncparks.gov','LURI.svg','1989','Lumber River, the only blackwater river in North Carolina that is designated as a National Wild and Scenic River','bald cypress trees in the swamp forest and the beautiful belted kingfisher.','■ 3 trails

■ Kids TRACK Trail (Lumber River TRACK Trail)

■ 5 miles of hiking:
2 miles at Princess Ann access,
3 miles at Chalk Banks access',NULL,'2025-01-30 13:45:28','2025-01-30 03:05:03','Princess Ann and Chalk Banks access areas†*
* Each access offers different amenities. Check ncparks.gov/luri or contact the park office with any questions.
† It takes approx. 1 hour to drive between the two access areas','https://www.ncparks.gov/state-parks/lumber-river-state-park'),
	 (28,'MARI','SPA','Mayo River State Park','Mayodan',ST_GeomFromText('POINT (-79.9475 36.4391)'),3364272530,'mayo.river@ncparks.gov','MARI.svg','2003','Fall Creek Falls, located at the Deshazo Mill access','the great blue heron, the largest heron in North America.','■ 4 trails

■ Kids TRACK Trail (Mayo River TRACK Trail)

■ 5.8 miles of hiking:
2 miles at Mayo Mountain access,
2.3 miles at Deshazo Mill access,
1.5 miles at Hickory Creek access',NULL,'2025-01-30 13:45:28','2025-01-30 03:07:24','Mayo Mountain*, Anglin Mill, Deshazo Mill, Hickory Creek and, Mayodan access areas
* The park office is located at the Mayo Mountain Access. This is the only access with restrooms.','https://www.ncparks.gov/state-parks/mayo-river-state-park'),
	 (29,'MEMO','SPA','Medoc Mountain State Park','Hollister',ST_GeomFromText('POINT (-77.8883 36.2639)'),2525866588,'medoc.mountain@ncparks.gov','MEMO.svg','1973','Medoc Mountain, the remains of a mountain range that is 325 feet tall and dates back to the Paleozoic Era','the pink lady’s slipper, mountain laurel, the Neuse River waterdog and pyrite minerals.','■ 21 trails

■ 1 wheelchair-accessible trail

■ 1 Kids TRACK Trail (Habitat Adventure Trail)

■ 31.3 miles of hiking

■ 12 miles of biking

■ 10 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:11:01','','https://www.ncparks.gov/state-parks/medoc-mountain-state-park'),
	 (30,'MEMI','SPA','Merchants Millpond State Park','Gatesville',ST_GeomFromText('POINT (-76.7016 36.4371)'),2523571191,'merchants.millpond@ncparks.gov','MEMI.svg','1973','A 760-acre millpond, which is over 200 years old','the American alligator, towering bald cypress and tupelo gum trees','■ 5 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (Coleman Trail)

■ 11.33 miles of hiking

■ 5 miles of biking

■ 1.25 miles of paddle trails',NULL,'2025-01-30 13:45:28','2025-01-30 03:13:05','','https://www.ncparks.gov/state-parks/merchants-millpond-state-park'),
	 (31,'MOMO','SPA','Morrow Mountain State Park','Albemarle',ST_GeomFromText('POINT (-80.0734 35.3737)'),7049824402,'morrow.mountain@ncparks.gov','MOMO.svg','1935','The summit of Morrow Mountain, one of the highest peaks in the Uwharrie mountain range','bald eagles, which you may see from the shores of Lake Tillery.','■ 14 trails

■ Wheelchair-accessible overlook deck

■ Kids TRACK Trail (Quarry Trail)

■ 54.6 miles of hiking

■ 33 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:15:46','','https://www.ncparks.gov/state-parks/morrow-mountain-state-park'),
	 (32,'MOJE','SNA','Mount Jefferson State Natural Area','West Jefferson',ST_GeomFromText('POINT (-81.468 36.3936)'),3362469653,'mount.jefferson@ncparks.gov','MOJE.svg','1956','Luther Rock, an rock formation of the metamorphosed amphibolite that gives Mount Jefferson its dark appearance','over 700 species of plants, including Dutchman’s pipevine, and the beautiful pipevine swallowtail butterfly that has a unique black and orange-spiked caterpillar.','■ 6 trails

■ Kids TRACK Trail (Rhododendron Trail)

■ 4.65 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:18:00','','https://www.ncparks.gov/state-parks/mount-jefferson-state-natural-area'),
	 (33,'MOMI','SPA','Mount Mitchell State Park','Burnsville',ST_GeomFromText('POINT (-82.2737 35.7528)'),8288674000,'mount.mitchell@ncparks.gov','MOMI.svg','1916','Observation area from the highest peak east of the Mississippi that provides spectacular views on a clear day','Fraser firs, bears, ravens, white-tailed deer, turkeys, coyotes, and bobcats. There is also a restaurant in the park.','■ 8 trails

■ Kids TRACK Trail (Balsam Nature Trail)

■ 40 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:20:53','','https://www.ncparks.gov/state-parks/mount-mitchell-state-park');
INSERT INTO parks (id,park_abbreviation,park_type,park_name,city,coordinates,phone,email,stamp_image,established_year,landmark,you_can_find,trails,boundaries,updated_at,created_at,accesses,website) VALUES
	 (34,'NERI','SPA','New River State Park','Laurel Springs',ST_GeomFromText('POINT (-81.3403 36.4676)'),3369822587,'new.river@ncparks.gov','NERI.svg','1976','40 miles of the New River: 26.5 miles of the New River are designated as a State Scenic River, a National Wild and Scenic River and an American Heritage River.','the hellbender, the largest salamander in the U.S., and 14 rare, threatened, or endangered species of plants.','■ 12 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (Hickory Trail)

■ 11.5 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:23:14','U.S. 221, Alleghany, Elk Shoals, Kings Creek, Prather’s Creek, Riverbend, Prather’s Creek, and Wagoner access areas','https://www.ncparks.gov/state-parks/new-river-state-park'),
	 (35,'OCMO','SNA','Occoneechee Mountain State Natural Area','Hillsborough',ST_GeomFromText('POINT (-79.1169 36.0608)'),9842501370,'eno.river@ncparks.gov','OCMO.svg','1997','The overlook, a small open area near the top of Occoneechee Mountain that provides a great view of the sunset','forests full of mountain laurel, rhododendron and, chestnut oaks, and the purple fringeless orchid.','■ 4 trails

■ 3 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:26:06','','https://www.ncparks.gov/state-parks/occoneechee-mountain-state-natural-area'),
	 (36,'PETT','SPA','Pettigrew State Park','Creswell',ST_GeomFromText('POINT (-76.4038 35.7888)'),2527974475,'pettigrew@ncparks.gov','PETT.svg','1939','Lake Phelps, which is the second largest natural lake in North Carolina at 16,000 acres','tundra swans, which visit the park from November to February.','■ 5 trails

■ 1 wheelchair-accessible trail

■ 9 miles of hiking

■ 8.75 miles of biking',NULL,'2025-01-30 13:45:28','2025-01-30 03:28:42','','https://www.ncparks.gov/state-parks/pettigrew-state-park'),
	 (37,'PIMO','SPA','Pilot Mountain State Park','Pinnacle',ST_GeomFromText('POINT (-80.4629 36.3412)'),3364445100,'pilot.mountain@ncparks.gov','PIMO.svg','1968','Pilot Knob, which rises sharply above the surrounding countryside and served as a navigational landmark for centuries of American Indians and early European settlers.','ravens, which you can see flying above Big Pinnacle.','■ 15 trails

■ Kids TRACK Trail (Sassafras Trail)

■ 28 miles of hiking

■ 9 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:31:46','Mountain section, Bean Shoals, Culler Road, Hauser Road, Ivy Bluffs, Pilot Creek, and Shoals Fishing access areas','https://www.ncparks.gov/state-parks/pilot-mountain-state-park'),
	 (38,'RARO','SPA','Raven Rock State Park','Lillington',ST_GeomFromText('POINT (-78.9127 35.4597)'),9108934888,'raven.rock@ncparks.gov','RARO.svg','1969','Raven Rock, a 150-foot crystalline structure that looks over the Cape Fear River','mountain laurel, with its beautiful bunches of light pink and white flowers that bloom in May and June.','■ 14 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (American Beech Trail)

■ 32.9 miles of hiking

■ 13.5 miles of biking

■ 8 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:34:07','Main Entrance and Moccasin Branch access areas','https://www.ncparks.gov/state-parks/raven-rock-state-park'),
	 (39,'REMO','SPA','Rendezvous Mountain','Purlear',ST_GeomFromText('POINT (-81.2871 36.2185)'),3366675072,'rendezvous.mountain@ncparks.gov','REMO.svg','1927','The 2,500-foot-tall Rendezvous Mountain that is at the base of the Blue Ridge Escarpment.','11 different types of warbler birds, and many other birds, that make this park a great place for birdwatching!','■ 4 trails

■ 5.5 miles of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:35:45','','https://www.ncparks.gov/state-parks/rendezvous-mountain'),
	 (40,'SILA','SPA','Singletary Lake State Park','Kelly',ST_GeomFromText('POINT (-78.4496 34.5831)'),9106692928,'singletary.lake@ncparks.gov','SILA.svg','1939','The 500-foot pier (for campers only) that goes into Singletary Lake and has a swim area and fishing.','the eastern fox squirrel, the largest species of tree squirrel native to North America; the red-cockaded woodpecker; and water birds that travel here in the winter.','■ 1 trail

■ Kids TRACK Trail (CCC Loop Trail)

■ 1 mile of hiking',NULL,'2025-01-30 13:45:28','2025-01-30 03:37:41','','https://www.ncparks.gov/state-parks/singletary-lake-state-park'),
	 (41,'SOMO','SPA','South Mountains State Park','Connelly Springs',ST_GeomFromText('POINT (-81.6 35.5963)'),8284334772,'south.mountains@ncparks.gov','SOMO.svg','1975','High Shoals Falls, where a strong, fast-moving stream of water drops 80 feet over a cliff face of bare rock','the rosebay rhododendron, native to the Appalachians, and produces large, beautiful white to purple flowers in June.','■ 23 trails

■ Kids TRACK Trail (River Trail)

■ 51 miles of hiking

■ 16.2 miles of biking

■ 33.3 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:42:12','Jacob Fork and Clear Creek access areas','https://www.ncparks.gov/state-parks/south-mountains-state-park'),
	 (42,'STMO','SPA','Stone Mountain State Park','Roaring Gap',ST_GeomFromText('POINT (-81.0273 36.3873)'),3369578185,'stone.mountain@ncparks.gov','STMO.svg','1969','Stone Mountain, a granite dome that is 600 feet tall and is located near the Hutchinson Homestead','some neat nature areas as you walk the top of Stone Mountain, like the Pine-Oak Heath, a unique part of the mountain with a lot of different plants and animals.','■ 9 trails

■ Kids TRACK Trail (0.75 mile on Stone Mountain Loop Trail)

■ 28.75 miles of hiking

■ 10 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:45:40','','https://www.ncparks.gov/state-parks/stone-mountain-state-park'),
	 (43,'WEWO','SPA','Weymouth Woods Sandhills Nature Preserve','Southern Pines',ST_GeomFromText('POINT (-79.371661 35.14704)'),9106922167,'weymouth.woods@ncparks.gov','WEWO.svg','1963','The oldest known living longleaf pine tree in the world, dating back to 1548','the red-cockaded woodpecker, the fox squirrel, Sandhills pyxie-moss, the pine snake, and the purple pitcher plant.','■ 11 trails

■ Kids TRACK Trail (Pine Barrens Trail)

■ 9.6 miles of hiking

■ 2.6 miles of horseback riding*

*No horse trailer parking available',NULL,'2025-01-30 13:45:28','2025-01-30 03:48:18','Weymouth Woods, Paint Hill and Boyd Tract access areas','https://www.ncparks.gov/state-parks/weymouth-woods-sandhills-nature-preserve');
INSERT INTO parks (id,park_abbreviation,park_type,park_name,city,coordinates,phone,email,stamp_image,established_year,landmark,you_can_find,trails,boundaries,updated_at,created_at,accesses,website) VALUES
	 (44,'WIUM','SPA','William B. Umstead State Park','Raleigh',ST_GeomFromText('POINT (-78.7502 35.8905)'),9848678240,'william.umstead@ncparks.gov','WIUM.svg','1934','Sycamore Bridge, an arched stone bridge that crosses Sycamore Creek','the marbled salamander and the pileated woodpecker with a bright red crest on its head.','■ 10 trails

■ Kids TRACK Trail (Oak Rock Trail)

■ 34 miles of hiking

■ 13 miles of biking

■ 13 miles of horseback riding',NULL,'2025-01-30 13:45:28','2025-01-30 03:52:15','Crabtree Creek and Reedy Creek entrances','https://www.ncparks.gov/state-parks/william-b-umstead-state-park'),
	 (45,'CABE','SPA','Carolina Beach State Park','Carolina Beach',ST_GeomFromText('POINT (-77.9066 34.0472)'),9104588206,'carolina.beach@ncparks.gov','CABE.svg','1969','Sugarloaf Dune, which has helped people find their way since 1663 and offers a great view of the Cape Fear River','the Venus flytrap, one of the rarest species of plants that eats bugs.','■ 9 trails

■ 1 wheelchair-accessible trail

■ Kids TRACK Trail (follows Snow’s Cut Trail)

■ 8.75 miles of hiking

■ 1 mile of biking',NULL,'2025-01-30 13:45:28','2025-01-30 03:54:47','','https://www.ncparks.gov/state-parks/carolina-beach-state-park');
INSERT INTO bucket_list_items (task,park,updated_at,created_at) VALUES
	 ('Find a venus flytrap',45,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Visit the Rockefeller House',4,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike to the top',3,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Swim in the spring-fed lake',5,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Admire the view from the Pinnacle',6,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike to the burn scar area',7,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike to the summit for an almost 360-degree view of up to 80 miles',8,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Cross the cable-hung footbridge on the Cox Mountain Trail',9,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Spot a bald eagle soaring and hunting along the shores',10,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Drive down the four-wheel-drive beach',11,'2025-01-30 04:36:34','2025-01-30 04:36:34');
INSERT INTO bucket_list_items (task,park,updated_at,created_at) VALUES
	 ('See a cannon firing demonstration',12,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Walk the Live Oak Trail',13,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Observe the view at the Overlook',15,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Find a Canadian hemlock tree',16,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Paddle to Bear Island and explore the undeveloped island',17,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Visit the Lower Cascades Falls',18,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Stroll the wetlands at The Summit at dusk',19,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Fly a kite and watch the sunset from the ridge',20,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('See the American Indian dugout canoe in the visitor center',21,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Watch a sunset at the Ebenezer Church access',22,'2025-01-30 04:36:34','2025-01-30 04:36:34');
INSERT INTO bucket_list_items (task,park,updated_at,created_at) VALUES
	 ('Enjoy a campfire by the shores',23,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Walk the award-winning Holly Discovery Trail',24,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Paddle the 33-acre Park Lake',25,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Walk the Lakeshore Trail',26,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike to Griffin''s Whirl',27,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Visit Fall Creek Falls',28,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Attend a night sky program',29,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Paddle the millpond',30,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Visit the Kron House',31,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike to Luther Rock',32,'2025-01-30 04:36:34','2025-01-30 04:36:34');
INSERT INTO bucket_list_items (task,park,updated_at,created_at) VALUES
	 ('Enjoy the summit overlook',33,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Paddle the New River',34,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('See the mountain laurel in bloom ',35,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike the Lake Shore Trail boardwalk',36,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike around the base of Big Pinacle',37,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Take the Raven Rock Loop Trail an explore under Raven Rock',38,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Walk the Amadhay Waterfall Trail',39,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Watch a sunset from the pier',40,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Visit High Shoals Falls',41,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Hike the Stone Mountain Loop Trail',42,'2025-01-30 04:36:34','2025-01-30 04:36:34');
INSERT INTO bucket_list_items (task,park,updated_at,created_at) VALUES
	 ('See the oldest-known living longleaf pine tree',43,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Challenge yourself with the 7.2-mile Sycamore Trail',44,'2025-01-30 04:36:34','2025-01-30 04:36:34'),
	 ('Participate in a First Day Hike on New Years Day',NULL,'2025-01-30 04:38:19','2025-01-30 04:38:19'),
	 ('Log your activity at nc100miles.org and earn digital badges',NULL,'2025-01-30 04:38:19','2025-01-30 04:38:19'),
	 ('Pick up and properly dispose of litter you find on the trail',NULL,'2025-01-30 04:38:19','2025-01-30 04:38:19');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (3,3,'Chimney Rock Access','743 Chimney Rock Park Road','','Chimney Rock','NC',28720,'2025-01-30 12:29:05','2025-01-30 00:17:04'),
	 (4,3,'Rumbling Bald Access','827 Boys Camp Road','','Lake Lure','NC',29746,'2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (5,4,'Long Valley Farm Access','2505 Long Valley Road','','Spring Lake','NC',28390,'2025-01-30 12:28:32','2025-01-30 00:24:58'),
	 (6,4,'Sandhills Access','995 McCloskey Road','','Fayetteville','NC',28311,'2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (7,5,'Main Address','240 Park Entrance Road','','Seven Springs','NC',28578,'2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (8,6,'Sparrow Springs Access','522 Park Office Lane','','Kings Mountain','NC',28086,'2025-01-30 12:31:46','2025-01-30 00:29:00'),
	 (9,7,'Main Address','2294 U.S. 17 N.','','South Mills','NC',27976,'2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (10,8,'Main Address','5564 Meat Camp Road','','Todd','NC',28684,'2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (11,9,'Cole Mill Access','6101 Cole Mill Road','','Durham','NC',27705,'2025-01-30 12:33:22','2025-01-30 00:37:15'),
	 (12,10,'Visitor Center & Beaverdam Access','13304 Creedmoor Road','','Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 01:01:30');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (13,11,'Main Address','1000 Loggerhead Road','','Kure Beach','NC',28449,'2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (14,12,'Main Address','2303 E. Fort Macon Road','','Atlantic Beach','NC',28512,'2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (15,13,'Main Address','2190 Camp Leach Road','','Washington','NC',27889,'2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (17,15,'Grassy Ridge Access','976 Grassy Ridge Road','','Sapphire','NC',28774,'2025-01-30 12:44:47','2025-01-30 01:12:08'),
	 (18,16,'Park Office','9872 NC Highway 105 S.','Suite 6','Banner Elk','NC',28604,'2025-01-30 12:45:27','2025-01-30 01:19:23'),
	 (19,16,'Profile Trailhead','4198 NC Highway 105 N.','','Banner Elk','NC',28604,'2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (20,17,'Main Address','1572 Hammock Beach Road','','Swansboro','NC',28584,'2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (21,18,'Main Access','1790 Hanging Rock Park Road','','Danbury','NC',27016,'2025-01-30 12:50:17','2025-01-30 02:21:57'),
	 (22,19,'The Summit Environmental Education & Conference Center','339 Conference Center Drive','','Browns Summit','NC',27214,'2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (23,19,'Iron Ore Belt Access','6068 N. Church Street','','Greensboro','NC',27455,'2025-01-30 02:35:26','2025-01-30 02:35:26');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (24,20,'Main Access','300 W. Carolista Drive','','Nags Head','NC',27959,'2025-01-30 12:52:21','2025-01-30 02:39:50'),
	 (25,20,'Soundside Access','330 W. Soundside Road','','Nags Head','NC',27959,'2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (26,21,'Main Address','4117 NC Highway 242 N.','','Elizabethtown','NC',28337,'2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (27,22,'Visitor Center','280 State Park Road','','Apex','NC',27523,'2025-01-30 12:58:51','2025-01-30 02:44:32'),
	 (28,23,'Satterwhite Point Access','6254 Satterwhite Point Road','','Henderson','NC',27537,'2025-01-30 13:03:32','2025-01-30 02:46:37'),
	 (29,24,'Paddy''s Creek Access','2229 Lake James State Park Road','','Nebo','NC',28761,'2025-01-30 13:06:28','2025-01-30 02:51:26'),
	 (30,24,'Catawba River Access','2785 NC Highway 126','','Nebo','NC',28761,'2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (31,25,'Main Address','759 State Park Road','','Troutman','NC',28166,'2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (32,26,'Main Address','1866 State Park Drive','','Lake Waccamaw','NC',28450,'2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (33,27,'Princess Ann Access and Park Office','2819 Princess Ann Road','','Orrum','NC',28369,'2025-01-30 03:05:03','2025-01-30 03:05:03');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (34,27,'Chalk Banks Access','26040 Raeford Road','','Wagram','NC',28396,'2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (35,28,'Mayo Mountain Access','500 Old Mayo Park Road','','Mayodan','NC',27027,'2025-01-30 13:11:42','2025-01-30 03:07:24'),
	 (36,29,'Main Address','1541 Medoc State Park Road','','Hollister','NC',27844,'2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (37,30,'Main Address','176 Millpond Road','','Gatesville','NC',27938,'2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (38,31,'Main Address','49104 Morrow Mountain Road','','Albemarle','NC',28001,'2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (39,32,'Main Address','1481 Mount Jefferson State Park Road','','West Jefferson','NC',28694,'2025-01-30 03:18:00','2025-01-30 03:18:00'),
	 (40,33,'Main Address','2388 NC Highway 128','','Burnsville','NC',28714,'2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (41,34,'U.S. 221 Access','358 New River State Park Road','','Laurel Springs','NC',28644,'2025-01-30 13:16:20','2025-01-30 03:23:14'),
	 (42,35,'Main Address','625 Virginia Cates Road','','Hillsborough','NC',27278,'2025-01-30 03:26:06','2025-01-30 03:26:06'),
	 (43,35,'Visitor Center','6101 Cole Mill Road','','Durham','NC',27705,'2025-01-30 03:26:06','2025-01-30 03:26:06');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (44,36,'Main Address','2252 Lake Shore Road','','Creswell','NC',27928,'2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (45,37,'Mountain Section','1721 Pilot Knob Park Road','','Pinnacle','NC',27043,'2025-01-30 13:23:00','2025-01-30 03:31:46'),
	 (46,38,'Main Address','3009 Raven Rock Road','','Lillington','NC',27546,'2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (47,39,'Main Address','1956 Rendezvous Mountain Road','','Purlear','NC',28665,'2025-01-30 03:35:45','2025-01-30 03:35:45'),
	 (48,40,'Main Address','6707 NC Highway 53 E.','','Kelly','NC',28448,'2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (49,41,'Jacob Fork Access','3001 South Mountain Park Ave.','','Connelly Springs','NC',28612,'2025-01-30 13:23:56','2025-01-30 03:42:12'),
	 (50,41,'Clear Creek Access','5999 Branstrom Orchard St.','','Morganton','NC',28655,'2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (51,42,'Main Address','3042 Frank Parkway','','Roaring Gap','NC',28668,'2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (52,43,'Main Address','1024 Fort Bragg Road','','Southern Pines','NC',28387,'2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (53,44,'Crabtree Creek Access','8801 Glenwood Ave.','','Raleigh','NC',27617,'2025-01-30 13:24:35','2025-01-30 03:52:15');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (54,44,'Reedy Creek Entrance','2100 N. Harrison Ave.','','Cary','NC',27513,'2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (55,45,'Main Address','1010 State Park Road','','Carolina Beach','NC',28428,'2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (57,6,'Linwood Access','4611 Linwood Road',NULL,'Gastonia','NC',28086,'2025-01-30 12:31:46','2025-01-30 12:31:46'),
	 (58,6,'Boulders Access','108 Vandyke Road',NULL,'Kings Mountain','NC',28086,'2025-01-30 12:31:46','2025-01-30 12:31:46'),
	 (59,9,'Cabe Lands Access','4950 Howe St.',NULL,'Durham','NC',27705,'2025-01-30 12:33:22','2025-01-30 12:33:22'),
	 (60,9,'Pleasant Green Access','4770 Pleasant Green Road',NULL,'Durham','NC',27705,'2025-01-30 12:34:32','2025-01-30 12:34:32'),
	 (61,9,'Pump Station Access','4023 Rivermont Road',NULL,'Durham','NC',27712,'2025-01-30 12:36:02','2025-01-30 12:36:02'),
	 (62,10,'Highway 50 Access','13900 Creedmoor Road',NULL,'Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 12:43:15'),
	 (63,10,'B.W. Wells Group Campround','1630 Bent Road',NULL,'Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 12:43:15'),
	 (64,10,'Holly Point Campground','14424 New Light Road',NULL,'Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 12:43:15');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (65,10,'Rolling View Access','4201 Baptist Road',NULL,'Durham','NC',27703,'2025-01-30 12:43:15','2025-01-30 12:43:15'),
	 (66,10,'Sandling Access','14601 Creedmoor Road',NULL,'Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 12:43:15'),
	 (67,10,'Shinleaf Campground','13708 New Light Road',NULL,'Wake Forest','NC',27587,'2025-01-30 12:43:15','2025-01-30 12:43:15'),
	 (68,15,'Frozen Creek Access','Frozen Creek Road',NULL,'Brevard','NC',28712,'2025-01-30 12:44:47','2025-01-30 12:44:47'),
	 (69,18,'Dan River Access','1258 Flinchum Road',NULL,'Danbury','NC',27016,'2025-01-30 12:50:17','2025-01-30 12:50:17'),
	 (70,18,'Lower Cascades Parking Area','2143 Hall Road',NULL,'Westfield','NC',27053,'2025-01-30 12:50:17','2025-01-30 12:50:17'),
	 (71,18,'Moore''s Wall Rock Climbing Access','1035 Climbing Access Drive',NULL,'Westfield','NC',27053,'2025-01-30 12:50:17','2025-01-30 12:50:17'),
	 (72,18,'Mountain Biking Access','2568 Moores Spring Road',NULL,'Westfield','NC',27053,'2025-01-30 12:50:17','2025-01-30 12:50:17'),
	 (73,18,'Tory''s Den Parking Area','1185 Charlie Young Road',NULL,'Westfield','NC',27053,'2025-01-30 12:50:17','2025-01-30 12:50:17'),
	 (74,22,'Crosswinds Campground','389 Farrington Road',NULL,'Apex','NC',27502,'2025-01-30 12:58:51','2025-01-30 12:58:51');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (75,22,'Ebenezer Church Access','2582 Beaver Creek Road',NULL,'Apex','NC',27502,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (76,22,'New Hope Overlook Access','339 W.H. Jones Road',NULL,'New Hill','NC',27562,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (77,22,'Parkers Creek Access','Parkers Creek Beach Road',NULL,'Chapel Hill','NC',27517,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (78,22,'Poplar Point Campground','558 Beaver Creek Road',NULL,'Apex','NC',27502,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (79,22,'Seaforth Access','Seaforth Beach Road',NULL,'Pittsboro','NC',27312,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (80,22,'Vista Point Access','2498 N. Pea Ridge Road',NULL,'Pittsboro','NC',27312,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (81,22,'White Oak Recreation Area','White Oak Beach Road',NULL,'Apex','NC',27523,'2025-01-30 12:58:51','2025-01-30 12:58:51'),
	 (82,23,'Bullocksville Access','3050 Bullocksville Park Road',NULL,'Manson','NC',27553,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (83,23,'County Line Access','200 County Line Park Road',NULL,'Manson','NC',27553,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (84,23,'Henderson Point Access','1427 Reverend Henderson Road',NULL,'Henderson','NC',27537,'2025-01-30 13:03:32','2025-01-30 13:03:32');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (85,23,'Hibernia Access','2041 Hibernia Road',NULL,'Henderson','NC',27537,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (86,23,'J.C. Cooper Campground','20 Shoreline Lane','','Henderson','NC',27537,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (87,23,'Kimball Point Access','460 Kimball Point Road',NULL,'Manson','NC',27553,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (88,23,'Nutbush Bridge Access','115/135 Jack Wade Farm Lane',NULL,'Henderson','NC',27537,'2025-01-30 13:03:32','2025-01-30 13:03:32'),
	 (89,24,'Canal Bridge Boat Ramp','9182 NC Highway 126',NULL,'Nebo','NC',28761,'2025-01-30 13:06:28','2025-01-30 13:06:28'),
	 (90,24,'Hidden Cove Boat Ramp','3381 NC Highway 126',NULL,'Nebo','NC',28761,'2025-01-30 13:06:28','2025-01-30 13:06:28'),
	 (91,28,'Anglin Mill Access','108 Mayo Beach Road',NULL,'Stoneville','NC',27048,'2025-01-30 13:11:42','2025-01-30 13:11:42'),
	 (92,28,'Deshazo Mill Access','628 Deshazo Mill Road',NULL,'Stoneville','NC',27048,'2025-01-30 13:11:42','2025-01-30 13:11:42'),
	 (93,28,'Hickory Creek Access','431 Tyne Road',NULL,'Stoneville','NC',27048,'2025-01-30 13:11:42','2025-01-30 13:11:42'),
	 (94,28,'Mayodan Access','N.C. 135 at Cedar Mountain Road',NULL,'Mayodan','NC',27027,'2025-01-30 13:11:42','2025-01-30 13:11:42');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (95,34,'Alleghany Access','',NULL,'Piney Creek','NC',28663,'2025-01-30 13:16:20','2025-01-30 13:16:20'),
	 (96,34,'Elk Shoals Access','349 Methodist Camp Road',NULL,'West Jefferson','NC',28694,'2025-01-30 13:16:20','2025-01-30 13:16:20'),
	 (97,34,'Kings Creek Access','2250 Kings Creek Road',NULL,'Piney Creek','NC',28663,'2025-01-30 13:16:20','2025-01-30 13:16:20'),
	 (98,34,'Wagoner Access','1477 Wagoner Access Road',NULL,'Jefferson','NC',28640,'2025-01-30 13:16:20','2025-01-30 13:16:20'),
	 (99,36,'Cypress Point Access','Shore Drive',NULL,'Creswell','NC',27928,'2025-01-30 13:18:31','2025-01-30 13:18:31'),
	 (100,36,'Pocosin Natural Area','Shore Drive',NULL,'Creswell','NC',27928,'2025-01-30 13:18:31','2025-01-30 13:18:31'),
	 (101,37,'Hauser Road Parking','622 Hauser Road',NULL,'Pinnacle','NC',27043,'2025-01-30 13:23:00','2025-01-30 13:23:00'),
	 (102,37,'Ivy Bluff Access','4240 Shoals Road',NULL,'East Bend','NC',27018,'2025-01-30 13:23:00','2025-01-30 13:23:00'),
	 (103,37,'Pilot Creek Access','382 Boyd Nelson Road',NULL,'Pinnacle','NC',27043,'2025-01-30 13:23:00','2025-01-30 13:23:00'),
	 (104,37,'Pinnacle Hotel Road / Culler Road Parking','134 Culler Road',NULL,'Pinnacle','NC',27043,'2025-01-30 13:23:00','2025-01-30 13:23:00');
INSERT INTO park_addresses (id,park,title,address_line_one,address_line_two,city,state,zipcode,updated_at,created_at) VALUES
	 (105,37,'Shoals Fishing Area','4454 Shoals Road',NULL,'East Bend','NC',27018,'2025-01-30 13:23:00','2025-01-30 13:23:00');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (1,3,'Biking_Red','2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (2,3,'Fishing_Red','2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (3,3,'Hiking_Red','2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (4,3,'Picnicking_Red','2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (5,3,'RockClimbing_Red','2025-01-30 00:17:04','2025-01-30 00:17:04'),
	 (6,4,'Biking_Red','2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (7,4,'Fishing_Red','2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (8,4,'Hiking_Red','2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (9,4,'HorsebackRiding_Red','2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (10,4,'Picnicking_Red','2025-01-30 00:24:58','2025-01-30 00:24:58');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (11,5,'Biking_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (12,5,'Fishing_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (13,5,'Hiking_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (14,5,'Paddling_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (15,5,'Picnicking_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (16,5,'Swimming_Red','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (17,5,'CamperCabins_Green','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (18,5,'Camping_Green','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (19,5,'GroupCamp_Green','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (20,5,'RVCamping_Green','2025-01-30 00:27:02','2025-01-30 00:27:02');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (21,5,'BoatRental_Blue','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (22,5,'Exhibits_Blue','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (23,5,'VisitorCenter_Blue','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (24,6,'Fishing_Red','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (25,6,'Hiking_Red','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (26,6,'Paddling_Red','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (27,6,'Picnicking_Red','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (28,6,'RockClimbing_Red','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (29,6,'Camping_Green','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (30,6,'GroupCamp_Green','2025-01-30 00:29:00','2025-01-30 00:29:00');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (31,6,'Exhibits_Blue','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (32,6,'VisitorCenter_Blue','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (33,7,'Biking_Red','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (34,7,'Fishing_Red','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (35,7,'Hiking_Red','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (36,7,'Paddling_Red','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (37,7,'Picnicking_Red','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (38,7,'BoatRental_Blue','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (39,7,'Exhibits_Blue','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (40,7,'VisitorCenter_Blue','2025-01-30 00:32:45','2025-01-30 00:32:45');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (41,8,'Hiking_Red','2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (42,8,'Picnicking_Red','2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (43,8,'Camping_Green','2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (44,8,'GroupCamp_Green','2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (45,9,'GroupCamp_Green','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (46,9,'Camping_Green','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (47,9,'Fishing_Red','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (48,9,'Hiking_Red','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (49,9,'Paddling_Red','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (50,9,'Picnicking_Red','2025-01-30 00:37:15','2025-01-30 00:37:15');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (51,9,'Exhibits_Blue','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (52,9,'VisitorCenter_Blue','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (53,9,'MST_Blaze','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (54,10,'GroupCamp_Green','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (55,10,'Camping_Green','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (56,10,'RVCamping_Green','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (57,10,'Biking_Red','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (58,10,'Fishing_Red','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (59,10,'Hiking_Red','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (60,10,'Paddling_Red','2025-01-30 01:01:30','2025-01-30 01:01:30');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (61,10,'Picnicking_Red','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (62,10,'Swimming_Red','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (63,10,'BoatRamp_Blue','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (64,10,'Exhibits_Blue','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (65,10,'Playground_Blue','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (66,10,'VisitorCenter_Blue','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (67,10,'MST_Blaze','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (68,11,'Fishing_Red','2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (69,11,'Hiking_Red','2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (70,11,'Paddling_Red','2025-01-30 01:03:38','2025-01-30 01:03:38');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (71,11,'Picnicking_Red','2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (72,11,'Swimming_Red','2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (73,12,'Biking_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (74,12,'Fishing_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (75,12,'Hiking_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (76,12,'Paddling_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (77,12,'Picnicking_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (78,12,'Swimming_Red','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (79,12,'Exhibits_Blue','2025-01-30 01:05:19','2025-01-30 01:05:19'),
	 (80,12,'VisitorCenter_Blue','2025-01-30 01:05:19','2025-01-30 01:05:19');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (81,13,'GroupCamp_Green','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (82,13,'RVCamping_Green','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (83,13,'Camping_Green','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (84,13,'CamperCabins_Green','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (85,13,'Fishing_Red','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (86,13,'Hiking_Red','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (87,13,'Paddling_Red','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (88,13,'Picnicking_Red','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (89,13,'Swimming_Red','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (90,13,'BoatRamp_Blue','2025-01-30 01:07:49','2025-01-30 01:07:49');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (91,13,'Exhibits_Blue','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (92,13,'VisitorCenter_Blue','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (105,15,'CamperCabins_Green','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (106,15,'RVCamping_Green','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (107,15,'Camping_Green','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (108,15,'Biking_Red','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (109,15,'Fishing_Red','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (110,15,'Hiking_Red','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (111,15,'HorsebackRiding_Red','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (112,15,'Picnicking_Red','2025-01-30 01:12:08','2025-01-30 01:12:08');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (113,15,'Exhibits_Blue','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (114,15,'VisitorCenter_Blue','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (115,15,'FBST_Blaze','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (116,16,'GroupCamp_Green','2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (117,16,'Camping_Green','2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (118,16,'Hiking_Red','2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (119,16,'MST_Blaze','2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (120,17,'CamperCabins_Green','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (121,17,'GroupCamp_Green','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (122,17,'RVCamping_Green','2025-01-30 01:22:17','2025-01-30 01:22:17');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (123,17,'Camping_Green','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (124,17,'CanoeinCamping_Green','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (125,17,'Fishing_Red','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (126,17,'Hiking_Red','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (127,17,'Paddling_Red','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (128,17,'Picnicking_Red','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (129,17,'Swimming_Red','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (130,17,'BoatRamp_Blue','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (131,17,'Exhibits_Blue','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (132,17,'VisitorCenter_Blue','2025-01-30 01:22:17','2025-01-30 01:22:17');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (133,18,'GroupCamp_Green','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (134,18,'Camping_Green','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (135,18,'VacationCabin_Green','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (136,18,'Biking_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (137,18,'Fishing_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (138,18,'Hiking_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (139,18,'HorsebackRiding_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (140,18,'Paddling_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (141,18,'Picnicking_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (142,18,'RockClimbing_Red','2025-01-30 02:21:57','2025-01-30 02:21:57');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (143,18,'Swimming_Red','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (144,18,'BoatRental_Blue','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (145,18,'Exhibits_Blue','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (146,18,'VisitorCenter_Blue','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (147,18,'MST_Blaze','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (148,19,'Fishing_Red','2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (149,19,'Hiking_Red','2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (150,19,'Picnicking_Red','2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (151,19,'VisitorCenter_Blue','2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (152,20,'Hiking_Red','2025-01-30 02:39:50','2025-01-30 02:39:50');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (153,20,'Paddling_Red','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (154,20,'Picnicking_Red','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (155,20,'Swimming_Red','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (156,20,'Exhibits_Blue','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (157,20,'VisitorCenter_Blue','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (158,20,'MST_Blaze','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (159,21,'GroupCamp_Green','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (160,21,'RVCamping_Green','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (161,21,'Camping_Green','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (162,21,'Fishing_Red','2025-01-30 02:41:49','2025-01-30 02:41:49');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (163,21,'Hiking_Red','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (164,21,'Paddling_Red','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (165,21,'Picnicking_Red','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (166,21,'Swimming_Red','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (167,21,'BoatRamp_Blue','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (168,21,'BoatRental_Blue','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (169,21,'Exhibits_Blue','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (170,21,'VisitorCenter_Blue','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (171,22,'GroupCamp_Green','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (172,22,'RVCamping_Green','2025-01-30 02:44:32','2025-01-30 02:44:32');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (173,22,'Camping_Green','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (174,22,'Fishing_Red','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (175,22,'Hiking_Red','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (176,22,'Paddling_Red','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (177,22,'Picnicking_Red','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (178,22,'Swimming_Red','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (179,22,'BoatRamp_Blue','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (180,22,'Playground_Blue','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (181,22,'Exhibits_Blue','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (182,22,'VisitorCenter_Blue','2025-01-30 02:44:32','2025-01-30 02:44:32');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (183,23,'GroupCamp_Green','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (184,23,'RVCamping_Green','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (185,23,'Camping_Green','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (186,23,'Fishing_Red','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (187,23,'Hiking_Red','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (188,23,'Paddling_Red','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (189,23,'Picnicking_Red','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (190,23,'Swimming_Red','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (191,23,'BoatRamp_Blue','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (192,23,'Playground_Blue','2025-01-30 02:46:37','2025-01-30 02:46:37');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (193,23,'Exhibits_Blue','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (194,23,'VisitorCenter_Blue','2025-01-30 02:46:37','2025-01-30 02:46:37'),
	 (195,24,'CanoeinCamping_Green','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (196,24,'Camping_Green','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (197,24,'Biking_Red','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (198,24,'Fishing_Red','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (199,24,'Hiking_Red','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (200,24,'Paddling_Red','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (201,24,'Picnicking_Red','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (202,24,'Swimming_Red','2025-01-30 02:51:26','2025-01-30 02:51:26');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (203,24,'BoatRamp_Blue','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (204,24,'Exhibits_Blue','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (205,24,'VisitorCenter_Blue','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (206,24,'FFST_Blaze','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (207,25,'CamperCabins_Green','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (208,25,'GroupCamp_Green','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (209,25,'RVCamping_Green','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (210,25,'Camping_Green','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (211,25,'Biking_Red','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (212,25,'Fishing_Red','2025-01-30 02:57:05','2025-01-30 02:57:05');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (213,25,'Hiking_Red','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (214,25,'Paddling_Red','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (215,25,'Picnicking_Red','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (216,25,'Swimming_Red','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (217,25,'BoatRamp_Blue','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (218,25,'BoatRental_Blue','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (219,25,'Exhibits_Blue','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (220,25,'VisitorCenter_Blue','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (221,26,'GroupCamp_Green','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (222,26,'Camping_Green','2025-01-30 03:00:18','2025-01-30 03:00:18');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (223,26,'Fishing_Red','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (224,26,'Hiking_Red','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (225,26,'Paddling_Red','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (226,26,'Picnicking_Red','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (227,26,'BoatRamp_Blue','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (228,26,'Exhibits_Blue','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (229,26,'VisitorCenter_Blue','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (230,27,'GroupCamp_Green','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (231,27,'CanoeinCamping_Green','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (232,27,'Camping_Green','2025-01-30 03:05:03','2025-01-30 03:05:03');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (233,27,'Fishing_Red','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (234,27,'Hiking_Red','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (235,27,'Paddling_Red','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (236,27,'Picnicking_Red','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (237,27,'BoatRamp_Blue','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (238,28,'GroupCamp_Green','2025-01-30 03:07:24','2025-01-30 03:07:24'),
	 (239,28,'Fishing_Red','2025-01-30 03:07:24','2025-01-30 03:07:24'),
	 (240,28,'Hiking_Red','2025-01-30 03:07:24','2025-01-30 03:07:24'),
	 (241,28,'Paddling_Red','2025-01-30 03:07:24','2025-01-30 03:07:24'),
	 (242,28,'Picnicking_Red','2025-01-30 03:07:24','2025-01-30 03:07:24');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (243,29,'CamperCabins_Green','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (244,29,'GroupCamp_Green','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (245,29,'RVCamping_Green','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (246,29,'Camping_Green','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (247,29,'EquestrianCamping_Green','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (248,29,'Biking_Red','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (249,29,'Fishing_Red','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (250,29,'Hiking_Red','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (251,29,'HorsebackRiding_Red','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (252,29,'Paddling_Red','2025-01-30 03:11:01','2025-01-30 03:11:01');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (253,29,'Picnicking_Red','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (254,29,'Playground_Blue','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (255,29,'Exhibits_Blue','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (256,29,'VisitorCenter_Blue','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (257,30,'GroupCamp_Green','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (258,30,'CanoeinCamping_Green','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (259,30,'Camping_Green','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (260,30,'Biking_Red','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (261,30,'Fishing_Red','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (262,30,'Hiking_Red','2025-01-30 03:13:05','2025-01-30 03:13:05');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (263,30,'Paddling_Red','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (264,30,'Picnicking_Red','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (265,30,'BoatRamp_Blue','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (266,30,'BoatRental_Blue','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (267,30,'Exhibits_Blue','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (268,30,'VisitorCenter_Blue','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (269,31,'CamperCabins_Green','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (270,31,'GroupCamp_Green','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (271,31,'RVCamping_Green','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (272,31,'Camping_Green','2025-01-30 03:15:46','2025-01-30 03:15:46');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (273,31,'VacationCabin_Green','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (274,31,'Fishing_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (275,31,'Hiking_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (276,31,'HorsebackRiding_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (277,31,'Paddling_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (278,31,'Picnicking_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (279,31,'Swimming_Red','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (280,31,'BoatRamp_Blue','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (281,31,'BoatRental_Blue','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (282,31,'Exhibits_Blue','2025-01-30 03:15:46','2025-01-30 03:15:46');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (283,31,'YRST_Blaze','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (284,32,'Hiking_Red','2025-01-30 03:18:00','2025-01-30 03:18:00'),
	 (285,32,'Picnicking_Red','2025-01-30 03:18:00','2025-01-30 03:18:00'),
	 (286,33,'Camping_Green','2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (287,33,'Hiking_Red','2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (288,33,'Picnicking_Red','2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (289,33,'Exhibits_Blue','2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (290,33,'MST_Blaze','2025-01-30 03:20:53','2025-01-30 03:20:53'),
	 (291,34,'GroupCamp_Green','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (292,34,'CanoeinCamping_Green','2025-01-30 03:23:14','2025-01-30 03:23:14');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (293,34,'RVCamping_Green','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (294,34,'Camping_Green','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (295,34,'Fishing_Red','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (296,34,'Hiking_Red','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (297,34,'Paddling_Red','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (298,34,'Picnicking_Red','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (299,34,'Swimming_Red','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (300,34,'Exhibits_Blue','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (301,34,'VisitorCenter_Blue','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (302,35,'Fishing_Red','2025-01-30 03:26:06','2025-01-30 03:26:06');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (303,35,'Hiking_Red','2025-01-30 03:26:06','2025-01-30 03:26:06'),
	 (304,35,'Picnicking_Red','2025-01-30 03:26:06','2025-01-30 03:26:06'),
	 (305,36,'GroupCamp_Green','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (306,36,'Camping_Green','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (307,36,'Biking_Red','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (308,36,'Fishing_Red','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (309,36,'Hiking_Red','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (310,36,'Paddling_Red','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (311,36,'Picnicking_Red','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (312,36,'Swimming_Red','2025-01-30 03:28:42','2025-01-30 03:28:42');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (313,36,'BoatRamp_Blue','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (314,36,'Exhibits_Blue','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (315,37,'CanoeinCamping_Green','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (316,37,'Camping_Green','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (317,37,'Fishing_Red','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (318,37,'Hiking_Red','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (319,37,'HorsebackRiding_Red','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (320,37,'Paddling_Red','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (321,37,'Picnicking_Red','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (322,37,'RockClimbing_Red','2025-01-30 03:31:46','2025-01-30 03:31:46');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (323,37,'Exhibits_Blue','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (324,37,'VisitorCenter_Blue','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (325,37,'MST_Blaze','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (326,37,'YRST_Blaze','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (327,38,'CamperCabins_Green','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (328,38,'CanoeinCamping_Green','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (329,38,'RVCamping_Green','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (330,38,'Camping_Green','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (331,38,'Biking_Red','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (332,38,'Hiking_Red','2025-01-30 03:34:07','2025-01-30 03:34:07');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (333,38,'HorsebackRiding_Red','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (334,38,'Picnicking_Red','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (335,38,'Exhibits_Blue','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (336,38,'VisitorCenter_Blue','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (337,39,'Hiking_Red','2025-01-30 03:35:45','2025-01-30 03:35:45'),
	 (338,39,'Picnicking_Red','2025-01-30 03:35:45','2025-01-30 03:35:45'),
	 (339,39,'Exhibits_Blue','2025-01-30 03:35:45','2025-01-30 03:35:45'),
	 (340,40,'GroupCamp_Green','2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (341,40,'VacationCabin_Green','2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (342,40,'Fishing_Red','2025-01-30 03:37:41','2025-01-30 03:37:41');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (343,40,'Hiking_Red','2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (344,40,'Paddling_Red','2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (345,41,'Camping_Green','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (346,41,'EquestrianCamping_Green','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (347,41,'Biking_Red','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (348,41,'Fishing_Red','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (349,41,'Hiking_Red','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (350,41,'HorsebackRiding_Red','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (351,41,'Paddling_Red','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (352,41,'Picnicking_Red','2025-01-30 03:42:12','2025-01-30 03:42:12');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (353,41,'Exhibits_Blue','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (354,41,'VisitorCenter_Blue','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (355,42,'GroupCamp_Green','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (356,42,'RVCamping_Green','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (357,42,'Camping_Green','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (358,42,'Fishing_Red','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (359,42,'Hiking_Red','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (360,42,'HorsebackRiding_Red','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (361,42,'Picnicking_Red','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (362,42,'RockClimbing_Red','2025-01-30 03:45:40','2025-01-30 03:45:40');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (363,42,'VisitorCenter_Blue','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (364,42,'MST_Blaze','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (365,43,'Hiking_Red','2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (366,43,'HorsebackRiding_Red','2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (367,43,'Picnicking_Red','2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (368,43,'Exhibits_Blue','2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (369,43,'VisitorCenter_Blue','2025-01-30 03:48:18','2025-01-30 03:48:18'),
	 (370,44,'GroupCamp_Green','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (371,44,'Camping_Green','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (372,44,'GroupCabins_Green','2025-01-30 03:52:15','2025-01-30 03:52:15');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (373,44,'PrimitiveCabin_Green','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (374,44,'Biking_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (375,44,'Fishing_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (376,44,'Hiking_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (377,44,'HorsebackRiding_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (378,44,'Paddling_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (379,44,'Picnicking_Red','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (380,44,'Exhibits_Blue','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (381,44,'VisitorCenter_Blue','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (382,45,'CamperCabins_Green','2025-01-30 03:54:47','2025-01-30 03:54:47');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (383,45,'GroupCamp_Green','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (384,45,'RVCamping_Green','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (385,45,'Camping_Green','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (386,45,'Biking_Red','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (387,45,'Fishing_Red','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (388,45,'Hiking_Red','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (389,45,'Paddling_Red','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (390,45,'Picnicking_Red','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (391,45,'BoatRamp_Blue','2025-01-30 03:54:47','2025-01-30 03:54:47'),
	 (392,45,'Exhibits_Blue','2025-01-30 03:54:47','2025-01-30 03:54:47');
INSERT INTO park_icons (id,park,icon,updated_at,created_at) VALUES
	 (393,45,'VisitorCenter_Blue','2025-01-30 03:54:47','2025-01-30 03:54:47');
INSERT INTO park_photos (id,park,photo,alt,updated_at,created_at) VALUES
	 (2,3,'CHRO.jpg','Chimney Rock State Park main photo','2025-01-30 00:19:38','2025-01-30 00:19:38'),
	 (3,4,'CACR.jpg','Carvers Creek State Park main image','2025-01-30 00:24:58','2025-01-30 00:24:58'),
	 (4,5,'CLNE.jpg','Cliffs of the Neuse State Park main image','2025-01-30 00:27:02','2025-01-30 00:27:02'),
	 (5,6,'CRMO.jpg','Crowders Mountain State Park main image','2025-01-30 00:29:00','2025-01-30 00:29:00'),
	 (6,7,'DISW.jpg','Dismal Swamp State Park main image','2025-01-30 00:32:45','2025-01-30 00:32:45'),
	 (7,8,'ELKN.jpg','Elk Knob State Park main image','2025-01-30 00:35:30','2025-01-30 00:35:30'),
	 (8,9,'ENRI.jpg','Eno River State Park main image','2025-01-30 00:37:15','2025-01-30 00:37:15'),
	 (9,10,'FALA.jpg','Falls Lake State Recreation Area main image','2025-01-30 01:01:30','2025-01-30 01:01:30'),
	 (10,11,'FOFI.jpg','Fort Fisher State Recreation Area main image','2025-01-30 01:03:38','2025-01-30 01:03:38'),
	 (11,12,'FOMA.jpg','Fort Macon State Park main image','2025-01-30 01:05:19','2025-01-30 01:05:19');
INSERT INTO park_photos (id,park,photo,alt,updated_at,created_at) VALUES
	 (12,13,'GOCR.jpg','Goose Creek State Park main image','2025-01-30 01:07:49','2025-01-30 01:07:49'),
	 (14,15,'GORG.jpg','Gorges State Park main image','2025-01-30 01:12:08','2025-01-30 01:12:08'),
	 (15,16,'GRMO.jpg','Grandfather Mountain State Park main image','2025-01-30 01:19:23','2025-01-30 01:19:23'),
	 (16,17,'HABE.jpg','Hammocks Beach State Park main image','2025-01-30 01:22:17','2025-01-30 01:22:17'),
	 (17,18,'HARO.jpg','Hanging Rock State Park main image','2025-01-30 02:21:57','2025-01-30 02:21:57'),
	 (18,19,'HARI.jpg','Haw River State Park main image','2025-01-30 02:35:26','2025-01-30 02:35:26'),
	 (19,20,'JORI.jpg','Jockey''s Ridge State Park main image','2025-01-30 02:39:50','2025-01-30 02:39:50'),
	 (20,21,'JONE.jpg','Jones Lake State Park main image','2025-01-30 02:41:49','2025-01-30 02:41:49'),
	 (21,22,'JORD.jpg','Jordan Lake State Recreation Area main image','2025-01-30 02:44:32','2025-01-30 02:44:32'),
	 (22,23,'KELA.jpg','Kerr Lake State Recreation Area main image','2025-01-30 02:46:37','2025-01-30 02:46:37');
INSERT INTO park_photos (id,park,photo,alt,updated_at,created_at) VALUES
	 (23,24,'LAJA.jpg','Lake James State Park main image','2025-01-30 02:51:26','2025-01-30 02:51:26'),
	 (24,25,'LANO.jpg','Lake Norman State Park main image','2025-01-30 02:57:05','2025-01-30 02:57:05'),
	 (25,26,'LAWA.jpg','Lake Waccamaw State Park main image','2025-01-30 03:00:18','2025-01-30 03:00:18'),
	 (26,27,'LURI.jpg','Lumber River State Park main image','2025-01-30 03:05:03','2025-01-30 03:05:03'),
	 (27,28,'MARI.jpg','Mayo River State Park main image','2025-01-30 03:07:24','2025-01-30 03:07:24'),
	 (28,29,'MEMO.jpg','Medoc Mountain State Park main image','2025-01-30 03:11:01','2025-01-30 03:11:01'),
	 (29,30,'MEMI.jpg','Merchants Millpond State Park main image','2025-01-30 03:13:05','2025-01-30 03:13:05'),
	 (30,31,'MOMO.jpg','Morrow Mountain State Park main image','2025-01-30 03:15:46','2025-01-30 03:15:46'),
	 (31,32,'MOJE.jpg','Mount Jefferson State Natural Area main image','2025-01-30 03:18:00','2025-01-30 03:18:00'),
	 (32,33,'MOMI.jpg','Mount Mitchell State Park main image','2025-01-30 03:20:53','2025-01-30 03:20:53');
INSERT INTO park_photos (id,park,photo,alt,updated_at,created_at) VALUES
	 (33,34,'NERI.jpg','New River State Park main image','2025-01-30 03:23:14','2025-01-30 03:23:14'),
	 (34,35,'OCMO.jpg','Occoneechee Mountain State Natural Area main image','2025-01-30 03:26:06','2025-01-30 03:26:06'),
	 (35,36,'PETT.jpg','Pettigrew State Park main image','2025-01-30 03:28:42','2025-01-30 03:28:42'),
	 (36,37,'PIMO.jpg','Pilot Mountain State Park main image','2025-01-30 03:31:46','2025-01-30 03:31:46'),
	 (37,38,'RARO.jpg','Raven Rock State Park main image','2025-01-30 03:34:07','2025-01-30 03:34:07'),
	 (38,39,'REMO.jpg','Rendezvous Mountain main image','2025-01-30 03:35:45','2025-01-30 03:35:45'),
	 (39,40,'SILA.jpg','Singletary Lake State Park main image','2025-01-30 03:37:41','2025-01-30 03:37:41'),
	 (40,41,'SOMO.jpg','South Mountains State Park main image','2025-01-30 03:42:12','2025-01-30 03:42:12'),
	 (41,42,'STMO.jpg','Stone Mountain State Park main image','2025-01-30 03:45:40','2025-01-30 03:45:40'),
	 (42,43,'WEWO.jpg','Weymouth Woods Sandhills Nature Preserve main image','2025-01-30 03:48:18','2025-01-30 03:48:18');
INSERT INTO park_photos (id,park,photo,alt,updated_at,created_at) VALUES
	 (43,44,'WIUM.jpg','William B. Umstead State Park main image','2025-01-30 03:52:15','2025-01-30 03:52:15'),
	 (44,45,'CABE.jpg','Carolina Beach State Park main image','2025-01-30 03:54:47','2025-01-30 03:54:47');
INSERT INTO trails (id,trail_name,`length`,description,updated_at,created_at) VALUES
	 (1,'Dan River State Trail','90 miles','northern Piedmont Triad','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (2,'Deep River Sate Trail','125 miles','Piedmont','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (3,'East Coast Greenway State Trail','795 miles','V-shaped: one arm through Raleigh, Durham and the Triangle and other arm through Albemarle and Pamlico Sounds, both meeting at Wilmington','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (4,'Equine State Trail','350 miles','southern Piedmont','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (5,'Fonta Flora State Trail','100 miles','Asheville and the Foothills / Lake James','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (6,'French Broad River State Trail','117 miles','western border','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (7,'Haw River State Trail','80 miles','Piedmont Triad / west of the Triangle','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (8,'Hickory Nut Gorge State Trail','50 miles','southwest of Asheville','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (9,'Mountains-to-Sea State Trail','1,400-miles','from Great Smoky Mountains National Park to the Outer Banks','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (10,'Northern Peaks State Trail','40 miles','High Country','2025-01-30 11:53:05','2025-01-30 11:53:05');
INSERT INTO trails (id,trail_name,`length`,description,updated_at,created_at) VALUES
	 (11,'Overmountain Victory State Trail','225 miles','west','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (12,'Roanoke River State Trail','132 miles','Albemarle Sound','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (13,'Wilderness Gateway State Trail','170 miles','southwest of Asheville / the Foothills','2025-01-30 11:53:05','2025-01-30 11:53:05'),
	 (14,'Yadkin River State Trail','162 miles','Piedmont','2025-01-30 11:53:05','2025-01-30 11:53:05');
INSERT INTO trail_icons (id,trail,icon,updated_at,created_at) VALUES
	 (1,1,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (2,2,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (3,2,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (4,2,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (5,3,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (6,3,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (7,4,'HorsebackRiding','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (8,5,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (9,5,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (10,6,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04');
INSERT INTO trail_icons (id,trail,icon,updated_at,created_at) VALUES
	 (11,7,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (12,7,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (13,8,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (14,8,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (15,9,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (16,9,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (17,9,'HorsebackRiding','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (18,10,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (19,11,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (20,12,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04');
INSERT INTO trail_icons (id,trail,icon,updated_at,created_at) VALUES
	 (21,13,'Hiking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (22,13,'Biking','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (23,13,'HorsebackRiding','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (24,13,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04'),
	 (25,14,'Paddling','2025-01-30 12:05:04','2025-01-30 12:05:04');
");






        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "collected_stamps");

            migrationBuilder.DropTable(
                name: "completed_bucket_list_items");

            migrationBuilder.DropTable(
                name: "park_addresses");

            migrationBuilder.DropTable(
                name: "park_icons");

            migrationBuilder.DropTable(
                name: "park_photos");

            migrationBuilder.DropTable(
                name: "park_visits");

            migrationBuilder.DropTable(
                name: "private_notes");

            migrationBuilder.DropTable(
                name: "trail_icons");

            migrationBuilder.DropTable(
                name: "bucket_list_items");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "trails");

            migrationBuilder.DropTable(
                name: "parks");
        }
    }
}
