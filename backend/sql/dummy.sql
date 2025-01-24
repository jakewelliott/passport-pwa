-- Insert test users
INSERT INTO users (username, email, password_hash)
VALUES (
		'johndoe',
		'john@example.com',
		'$2b$10$6Ks0vXxOC5BqPvG3IqK3p.ZK4B0P7uJsQX3DMQ1xRzF0H5L5K8L2O'
	),
	-- password: password123
	(
		'janesmith',
		'jane@example.com',
		'$2b$10$6Ks0vXxOC5BqPvG3IqK3p.ZK4B0P7uJsQX3DMQ1xRzF0H5L5K8L2O'
	),
	(
		'bobwilson',
		'bob@example.com',
		'$2b$10$6Ks0vXxOC5BqPvG3IqK3p.ZK4B0P7uJsQX3DMQ1xRzF0H5L5K8L2O'
	);
-- Insert NC State Parks
INSERT INTO parks (name, location, description, latitude, longitude)
VALUES (
		'Jockey''s Ridge State Park',
		'Nags Head, NC',
		'Home to the tallest living sand dune on the Atlantic coast. The park is a premier location for kite-flying, hang-gliding, and sandboarding.',
		35.9642,
		-75.6330
	),
	(
		'Mount Mitchell State Park',
		'Burnsville, NC',
		'The highest peak east of the Mississippi River, offering stunning views and challenging hiking trails.',
		35.7650,
		-82.2652
	),
	(
		'Hanging Rock State Park',
		'Danbury, NC',
		'Features cascading waterfalls, sheer cliffs, and spectacular views of the Piedmont plateau.',
		36.4119,
		-80.2541
	),
	(
		'William B. Umstead State Park',
		'Raleigh, NC',
		'An urban oasis with extensive trails for hiking, mountain biking, and horseback riding.',
		35.8905,
		-78.7501
	),
	(
		'Stone Mountain State Park',
		'Roaring Gap, NC',
		'Named for the 600-foot granite dome, this park offers rock climbing, hiking, and trout fishing.',
		36.3873,
		-81.0273
	);
-- Insert stamps for each park
INSERT INTO stamps (park_id, name, description)
VALUES (
		1,
		'Dune Explorer',
		'Conquered the highest sand dune on the East Coast!'
	),
	(
		1,
		'Sunset Seeker',
		'Witnessed a breathtaking sunset from Jockey''s Ridge'
	),
	(
		2,
		'Summit Achiever',
		'Reached the highest point east of the Mississippi'
	),
	(
		2,
		'Cloud Walker',
		'Hiked above the clouds at Mount Mitchell'
	),
	(
		3,
		'Waterfall Wanderer',
		'Discovered all five waterfalls at Hanging Rock'
	),
	(
		3,
		'Rock Climber',
		'Scaled the magnificent cliffs of Hanging Rock'
	),
	(
		4,
		'Trail Pioneer',
		'Explored Umstead''s extensive trail network'
	),
	(
		4,
		'Nature Navigator',
		'Spotted diverse wildlife in Umstead State Park'
	),
	(
		5,
		'Granite Guru',
		'Climbed the iconic Stone Mountain dome'
	),
	(
		5,
		'History Hunter',
		'Visited the historic Hutchinson Homestead'
	);
-- Insert some collected stamps for users
INSERT INTO user_stamps (user_id, stamp_id, date_collected)
VALUES (1, 1, '2024-01-15 14:30:00'),
	(1, 2, '2024-01-15 16:45:00'),
	(1, 5, '2024-02-01 12:00:00'),
	(2, 3, '2024-01-20 10:15:00'),
	(2, 4, '2024-01-20 13:30:00'),
	(3, 7, '2024-02-05 09:00:00'),
	(3, 8, '2024-02-05 11:30:00'),
	(3, 9, '2024-02-10 14:00:00');