-- GRANT ALL PRIVILEGES ON * . * TO 'user'@'%';
-- FLUSH PRIVILEGES;
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT INSERT, SELECT, DELETE, UPDATE ON database.* TO 'user'@'%' IDENTIFIED BY 'password';