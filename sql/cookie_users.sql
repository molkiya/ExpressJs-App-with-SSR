SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `sessions` (
    `session_id` varchar(128) PRIMARY KEY CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `expires`    int(11) UNSIGNED NOT NULL,
    `data`       mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;