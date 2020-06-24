-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ideal
-- ------------------------------------------------------
-- Server version	10.1.44-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `girl_gif`
--

DROP TABLE IF EXISTS `girl_gif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `girl_gif` (
  `_id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `img_path` varchar(100) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `girl_gif`
--

LOCK TABLES `girl_gif` WRITE;
/*!40000 ALTER TABLE `girl_gif` DISABLE KEYS */;
INSERT INTO `girl_gif` VALUES (1,'고윤정','../images/girl/girl1.gif'),(2,'정채연','../images/girl/girl2.gif'),(3,'지수','../images/girl/girl3.gif'),(4,'김다예','../images/girl/girl4.gif'),(5,'김지원','../images/girl/girl5.gif'),(6,'김세정','../images/girl/girl6.gif'),(7,'김태리','../images/girl/girl7.gif'),(8,'고준희','../images/girl/girl8.gif'),(9,'이선빈','../images/girl/girl9.gif'),(10,'이성경','../images/girl/girl10.gif'),(11,'루다','../images/girl/girl11.gif'),(12,'박수진','../images/girl/girl12.gif'),(13,'태연','../images/girl/girl13.gif'),(14,'경리','../images/girl/girl14.gif'),(15,'한지민','../images/girl/girl15.gif'),(16,'혜리','../images/girl/girl16.gif'),(17,'제니','../images/girl/girl17.gif'),(18,'지효','../images/girl/girl17.gif'),(19,'쯔위','../images/girl/girl17.gif'),(20,'조보아','../images/girl/girl20.gif'),(21,'주결경','../images/girl/girl21.gif'),(22,'김소현','../images/girl/girl22.gif'),(23,'아이린','../images/girl/girl23.gif'),(24,'모모','../images/girl/girl24.gif'),(25,'박보영','../images/girl/girl25.gif'),(26,'박민영','../images/girl/girl26.gif'),(27,'설현','../images/girl/girl27.gif'),(28,'신혜선','../images/girl/girl28.gif'),(29,'신세경','../images/girl/girl29.gif'),(30,'손나은','../images/girl/girl30.gif'),(31,'예리','../images/girl/girl31.gif'),(32,'윤아','../images/girl/girl32.gif');
/*!40000 ALTER TABLE `girl_gif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `girl_rank`
--

DROP TABLE IF EXISTS `girl_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `girl_rank` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `like_num` int(30) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `my_ideal` varchar(100) DEFAULT NULL,
  `ideal_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `girl_rank`
--

LOCK TABLES `girl_rank` WRITE;
/*!40000 ALTER TABLE `girl_rank` DISABLE KEYS */;
INSERT INTO `girl_rank` VALUES (1,6,'앱두','../images/ideal/abcaxbizfi.jpg','이상형'),(2,5,'루피','../images/ideal/dajkrjkdla.jpg','GKDS'),(3,1,'쵸파','../images/ideal/cnevvnzkii.jpg','CHOPA'),(4,0,'원','../images/ideal/xrugycoyqf.jpg','Ideal1');
/*!40000 ALTER TABLE `girl_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ideal`
--

DROP TABLE IF EXISTS `ideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ideal` (
  `_id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `img_path` varchar(100) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideal`
--

LOCK TABLES `ideal` WRITE;
/*!40000 ALTER TABLE `ideal` DISABLE KEYS */;
/*!40000 ALTER TABLE `ideal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `man_gif`
--

DROP TABLE IF EXISTS `man_gif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `man_gif` (
  `_id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `img_path` varchar(100) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `man_gif`
--

LOCK TABLES `man_gif` WRITE;
/*!40000 ALTER TABLE `man_gif` DISABLE KEYS */;
INSERT INTO `man_gif` VALUES (1,'박보검','../images/man/man1.gif'),(2,'마동석','../images/man/man2.gif'),(3,'안보현','../images/man/man3.gif'),(4,'GD','../images/man/man4.gif'),(5,'서강준','../images/man/man5.gif'),(6,'공유','../images/man/man6.gif'),(7,'손흥민','../images/man/man7.gif'),(8,'뜨뜨뜨뜨','../images/man/man8.gif'),(9,'지창욱','../images/man/man9.gif'),(10,'양세종','../images/man/man10.gif'),(11,'유재석','../images/man/man11.gif'),(12,'송중기','../images/man/man12.gif'),(13,'피오','../images/man/man13.gif'),(14,'지코','../images/man/man14.gif'),(15,'류준열','../images/man/man15.gif'),(16,'유아인','../images/man/man16.gif');
/*!40000 ALTER TABLE `man_gif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `_id` int(30) NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `my_ideal` varchar(100) DEFAULT NULL,
  `ideal_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ejrdnjs96','박덕원','ejrdnjs123','앱두','남자','../images/ideal/abcaxbizfi.jpg','이상형');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-22  6:25:16
