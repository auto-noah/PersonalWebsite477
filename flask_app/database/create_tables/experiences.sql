CREATE TABLE IF NOT EXISTS `experiences` (
`experience_id`      int(11)       NOT NULL AUTO_INCREMENT	COMMENT 'The primary key, and unique identifier for each experience',
`position_id`        int(11)       NOT NULL 				COMMENT 'FK:References the positions.position_id',
`name`               varchar(100)  NOT NULL					COMMENT 'The name of the experience',
`description`        varchar(100)  NOT NULL	                COMMENT 'The description of the experience',
`hyperlink`          varchar(100)  NOT NULL	                COMMENT 'The link where people can learn more about the experience',
`start_date`         date          NOT NULL                 COMMENT 'The start date for the experience',
`end_date`           date          DEFAULT NULL             COMMENT 'The end date for the experience',
PRIMARY KEY (`experience_id`),
FOREIGN KEY (position_id) REFERENCES positions(position_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT="Experiences I have had";