-- Drop tables if they exist
DROP TABLE IF EXISTS user_stamps;
DROP TABLE IF EXISTS stamps;
DROP TABLE IF EXISTS parks;
DROP TABLE IF EXISTS users;
-- Create users table
CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Create parks table
CREATE TABLE parks (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	location VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	latitude DECIMAL(10, 8) NOT NULL,
	longitude DECIMAL(11, 8) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Create stamps table
CREATE TABLE stamps (
	id INT PRIMARY KEY AUTO_INCREMENT,
	park_id INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (park_id) REFERENCES parks(id) ON DELETE CASCADE
);
-- Create user_stamps junction table for many-to-many relationship
CREATE TABLE user_stamps (
	user_id INT NOT NULL,
	stamp_id INT NOT NULL,
	date_collected TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id, stamp_id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (stamp_id) REFERENCES stamps(id) ON DELETE CASCADE
);
-- Create indexes for better query performance
CREATE INDEX idx_parks_location ON parks(location);
CREATE INDEX idx_stamps_park_id ON stamps(park_id);
CREATE INDEX idx_user_stamps_user_id ON user_stamps(user_id);
CREATE INDEX idx_user_stamps_stamp_id ON user_stamps(stamp_id);