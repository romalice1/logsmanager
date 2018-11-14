
-- creating table application --
CREATE TABLE IF NOT EXISTS application(
    application_id VARCHAR(200) NOT NULL UNIQUE,
    application_name VARCHAR(200) NOT NULL,
    date_created timestamp
);


--- creating table log ---
CREATE TABLE IF NOT EXISTS log(
    date timestamp,
    application_id VARCHAR(200) NOT NULL,
    called_api VARCHAR(200) NOT NULL,
    error_status VARCHAR(3) NOT NULL,
    error_message VARCHAR(200) NOT NULL
);