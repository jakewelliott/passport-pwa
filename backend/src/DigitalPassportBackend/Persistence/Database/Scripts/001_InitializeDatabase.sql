CREATE TABLE
    IF NOT EXISTS products (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS reviews (
        id UUID PRIMARY KEY, 
        product_id UUID NOT NULL, 
        rating INT NOT NULL, 
        text TEXT NOT NULL,
        CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
    ) ;

/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for osx10.20 (arm64)
--
-- Host: localhost    Database: passport
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `bucket_list_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `bucket_list_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task` varchar(255) NOT NULL,
  `park` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `park` (`park`),
  CONSTRAINT `bucket_list_items_ibfk_1` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `collected_stamps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `collected_stamps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `park` int NOT NULL,
  `method` enum('manual','location') NOT NULL,
  `location` point NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `park` (`park`),
  CONSTRAINT `collected_stamps_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `collected_stamps_ibfk_2` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `completed_bucket_list_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `completed_bucket_list_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park` int NOT NULL,
  `bucket_list_item` int NOT NULL,
  `user` int NOT NULL,
  `location` point NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `park` (`park`),
  KEY `bucket_list_item` (`bucket_list_item`),
  KEY `user` (`user`),
  CONSTRAINT `completed_bucket_list_items_ibfk_1` FOREIGN KEY (`park`) REFERENCES `parks` (`id`),
  CONSTRAINT `completed_bucket_list_items_ibfk_2` FOREIGN KEY (`bucket_list_item`) REFERENCES `bucket_list_items` (`id`),
  CONSTRAINT `completed_bucket_list_items_ibfk_3` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_addresses`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `address_line_one` varchar(255) NOT NULL,
  `address_line_two` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` enum('NC') NOT NULL,
  `zipcode` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `park` (`park`),
  CONSTRAINT `park_addresses_ibfk_1` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_icons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_icons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park` int NOT NULL,
  `icon` enum('Biking-Red','BoatRamp-Blue','BoatRental-Blue','CamperCabins-Green','Camping-Black','Camping-Green','CanoeinCamping-Green','EquestrianCamping-Green','Exhibits-Blue','FBST-Blaze','FFST-Blaze','Fishing-Red','GroupCabins-Green','GroupCamp-Green','HGST-Blaze','Hiking-Red','HorsebackRiding-Red','MST-Blaze','Paddling-Red','PicnicShelter-Black','Picnicking-Red','Playground-Blue','PrimitiveCabin-Green','RVCamping-Green','RockClimbing-Red','Swimming-Red','VacationCabin-Green','VisitorCenter-Blue','YRST-Blaze') NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `park` (`park`),
  CONSTRAINT `park_icons_ibfk_1` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_icons_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_icons_enum` (
  `value` enum('Biking-Red','BoatRamp-Blue','BoatRental-Blue','CamperCabins-Green','Camping-Black','Camping-Green','CanoeinCamping-Green','EquestrianCamping-Green','Exhibits-Blue','FBST-Blaze','FFST-Blaze','Fishing-Red','GroupCabins-Green','GroupCamp-Green','HGST-Blaze','Hiking-Red','HorsebackRiding-Red','MST-Blaze','Paddling-Red','PicnicShelter-Black','Picnicking-Red','Playground-Blue','PrimitiveCabin-Green','RVCamping-Green','RockClimbing-Red','Swimming-Red','VacationCabin-Green','VisitorCenter-Blue','YRST-Blaze') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_photos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park` int NOT NULL,
  `photo` text NOT NULL,
  `alt` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `park` (`park`),
  CONSTRAINT `park_photos_ibfk_1` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_type_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_type_enum` (
  `value` enum('SL','SNA','SPA','SRA','ST') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `park_visits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `park_visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `park` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `park` (`park`),
  CONSTRAINT `park_visits_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `park_visits_ibfk_2` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `parks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `parks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park_abbreviation` varchar(255) NOT NULL,
  `park_type` enum('SL','SNA','SPA','SRA','ST') NOT NULL,
  `park_name` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `coordinates` point DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `stamp_image` text,
  `established_year` varchar(255) DEFAULT NULL,
  `landmark` longtext,
  `you_can_find` longtext,
  `trails` longtext,
  `boundaries` polygon DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accesses` longtext,
  `website` varchar(255) NOT NULL DEFAULT 'https://www.ncparks.gov/state-parks',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `private_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `private_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `park` int NOT NULL,
  `note` longtext NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `park` (`park`),
  CONSTRAINT `private_notes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `private_notes_ibfk_2` FOREIGN KEY (`park`) REFERENCES `parks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stamp_collection_method_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `stamp_collection_method_enum` (
  `value` enum('manual','location') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `states_enum` (
  `value` enum('NC') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trail_icons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `trail_icons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trail` int NOT NULL,
  `icon` enum('4WDBeach','Accessible','Amphiteater','BackpackCamping','Bathhouse','Biking','BoatRamp','Boating','CamperCabin','Camping','DumpStation','ElectricHookup','ElectricWaterHookups','EquestrianCamping','Firewood','Fishing','GroupCamp','Hiking','HorseTrailerParking','HorsebackRiding','Hospital','IE_Exhibits','Information','Marina','PaddleInCamping','Paddling','ParkGate','Picnic','PicnicShelter','PointofInterest','PrimitiveCabin','Restroom','RockClimbing','SewerHookup','Swimming','TRACKTrail','TentTrailerCamping','VacationCabin','ViewingSymbol','VisitorCenter','WaterHookup','WaterSpigot') NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trail` (`trail`),
  CONSTRAINT `trail_icons_ibfk_1` FOREIGN KEY (`trail`) REFERENCES `trails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trail_icons_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `trail_icons_enum` (
  `value` enum('4WDBeach','Accessible','Amphiteater','BackpackCamping','Bathhouse','Biking','BoatRamp','Boating','CamperCabin','Camping','DumpStation','ElectricHookup','ElectricWaterHookups','EquestrianCamping','Firewood','Fishing','GroupCamp','Hiking','HorseTrailerParking','HorsebackRiding','Hospital','IE_Exhibits','Information','Marina','PaddleInCamping','Paddling','ParkGate','Picnic','PicnicShelter','PointofInterest','PrimitiveCabin','Restroom','RockClimbing','SewerHookup','Swimming','TRACKTrail','TentTrailerCamping','VacationCabin','ViewingSymbol','VisitorCenter','WaterHookup','WaterSpigot') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trails`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `trails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trail_name` varchar(255) NOT NULL,
  `length` varchar(255) DEFAULT NULL,
  `description` longtext,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_roles_enum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `user_roles_enum` (
  `value` enum('visitor','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('visitor','admin') CHARACTER SET utf8mb4 NOT NULL DEFAULT 'visitor',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'passport'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-02-02 23:34:25
