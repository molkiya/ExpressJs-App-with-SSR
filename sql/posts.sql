SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `posts` (
    `id`       int(11) PRIMARY KEY NOT NULL,
    `time`     varchar(20)  NOT NULL,
    `login`    varchar(40)  NOT NULL,
    `text`     varchar(300) NOT NULL,
    `imgvideo` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `posts` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;
COMMIT;