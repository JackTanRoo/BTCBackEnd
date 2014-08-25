

USE BTCTestv2;

CREATE TABLE UrlAddressKey (
  -- combination_id SMALLINT NOT NULL AUTO_INCREMENT,
  url_hash varchar(255),
  btc_address varchar(255),
  pk_hash varchar(255),
  UNIQUE(url_hash)
);


-- schema for BTCTest;

-- CREATE TABLE Urls (
--   url_id SMALLINT NOT NULL AUTO_INCREMENT,
--   url_hash varchar(255),
--   UNIQUE(url_hash),
--   PRIMARY KEY (url_id)
-- );


-- CREATE TABLE Addresses (
--   address_id SMALLINT NOT NULL AUTO_INCREMENT,
--   url_id SMALLINT,
--   btc_address varchar(255),
--   PRIMARY KEY (address_id),
--   FOREIGN KEY (url_id) REFERENCES Urls(url_id)
-- );

-- CREATE TABLE PrivateKeys (
--   pk_id SMALLINT NOT NULL AUTO_INCREMENT,
--   address_id SMALLINT,
--   pk_hash varchar(255),
--   UNIQUE(pk_hash),
--   PRIMARY KEY (pk_id),
--   FOREIGN KEY (address_id) REFERENCES Addresses(address_id)
-- );
