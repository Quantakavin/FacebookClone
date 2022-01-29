const { Pool } = require('pg')
const config = require('./config')

const connectionString = config.database

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool

/*

  DROP TABLE IF EXISTS users; 
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  privacy BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT false
  )

DROP TABLE IF EXISTS post; 
CREATE TABLE post (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES users(id),
content VARCHAR,
file bytea,
type VARCHAR NOT NULL,
caption VARCHAR
)

DROP TABLE IF EXISTS comment; 
CREATE TABLE comment (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES users(id),
post_id INT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
content VARCHAR NOT NULL
)

DROP TABLE IF EXISTS likes;
CREATE TABLE likes (
user_id INT NOT NULL REFERENCES users(id),
post_id INT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
PRIMARY KEY(user_id, post_id)
)

DROP TABLE IF EXISTS friendship;
CREATE TABLE friendship (
user_id INT NOT NULL REFERENCES users(id),
friend_id INT NOT NULL REFERENCES users(id),
confirmed BOOLEAN DEFAULT false,
PRIMARY KEY(user_id, friend_id)
)

DROP TABLE IF EXISTS conversation;
CREATE TABLE conversation (
id SERIAL PRIMARY KEY,
sender_id INT NOT NULL REFERENCES users(id),
receiver_id INT NOT NULL REFERENCES users(id),
UNIQUE (sender_id, receiver_id)
)

DROP TABLE IF EXISTS message;
CREATE TABLE message (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
conversation_id INT NOT NULL,
content VARCHAR NOT NULL,
Foreign Key (conversation_id) REFERENCES conversation(id),
Foreign Key (user_id) REFERENCES users(id),
date TIMESTAMP,
read BOOLEAN DEFAULT false
)

ALTER TABLE users
DROP COLUMN active;

ALTER TABLE post
ADD COLUMN date TIMESTAMP

ALTER TABLE comment
ADD COLUMN date TIMESTAMP

ALTER TABLE post
ADD COLUMN caption VARCHAR;

ALTER TABLE post
ADD COLUMN cloudinaryurl VARCHAR;

ALTER TABLE post
ADD COLUMN cloudinaryid VARCHAR;

ALTER TABLE post
DROP COLUMN file;


ALTER TABLE users
ADD COLUMN picurl VARCHAR;

ALTER TABLE users
ADD COLUMN picid VARCHAR;

ALTER TABLE users
ADD COLUMN coverurl VARCHAR;

ALTER TABLE users
ADD COLUMN coverid VARCHAR;

ALTER TABLE users
DROP COLUMN profilepic;

ALTER TABLE users
DROP COLUMN coverpic;

ALTER TABLE post
ADD COLUMN editdate TIMESTAMP;

ALTER TABLE comment
ADD COLUMN editdate TIMESTAMP;

CREATE INDEX post_userid ON post(user_id)

CREATE INDEX comment_userid ON comment(user_id)
CREATE INDEX comment_postid ON comment(post_id)

CREATE INDEX like_userid ON likes(user_id)
CREATE INDEX like_postid ON likes(post_id)

CREATE INDEX message_userid ON message(user_id)
CREATE INDEX message_conversationid ON message(conversation_id)

CREATE INDEX post_time ON post(date)
CREATE INDEX comment_time ON comment(date)
CREATE INDEX message_time ON message(date)


  */
