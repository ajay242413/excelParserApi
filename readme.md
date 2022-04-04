# Excel parser API
# set up a mysql database, current app uses bellow details to connect to local db
`    host: 'localhost',
     user: 'root',
     password: 'root',
     port: 3306,
     database: 'db_images'`

# create a new table
  
` CREATE TABLE `images` (
 `ID` int NOT NULL,
 `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
 `IMAGES` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
 `WIN` float DEFAULT NULL,
 PRIMARY KEY (`ID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci`

# create this Stored procedure which stores data received from API

Stored procedure is kept in text file names sp.txt

# running the app

run `npm install` to install node modules
 
