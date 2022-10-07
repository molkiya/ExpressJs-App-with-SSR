SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `users` (
    `id`      int(11) PRIMARY KEY NOT NULL,
    `login`   varchar(20)  NOT NULL,
    `hash`    varchar(200) NOT NULL,
    `salt`    varchar(100) NOT NULL,
    `isAdmin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `users` (`id`, `login`, `hash`, `salt`, `isAdmin`)
ALTER TABLE `users` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;