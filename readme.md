
 * below command needs to run to create a new table
 
 
 CREATE TABLE `images` (
 `ID` int NOT NULL,
 `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
 `IMAGES` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
 `WIN` float DEFAULT NULL,
 PRIMARY KEY (`ID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci

