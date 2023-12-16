CREATE TABLE IF NOT EXISTS `feedback` (
`comment_id`         int(11)       NOT NULL AUTO_INCREMENT	COMMENT 'The primary key, and unique identifier for each comment',
`name`               varchar(100)  NOT NULL					COMMENT 'The name of the commentator',
`email`              varchar(100)  NOT NULL					COMMENT 'The email of the commentator',
`comment`            varchar(100)  NOT NULL					COMMENT 'The text of the comment',
PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT="Contains user feedback about your website";