CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name NOT NULL TEXT,
  email NOT NULL TEXT UNIQUE,
  password NOT NULL TEXT,
  joined_at DATE DEFAULT CURRENT_DATE,
  user_image_url TEXT,
  primary_city NOT NULL TEXT
);
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  latitude FLOAT,
  longitude FLOAT,
  image_url TEXT,
  description TEXT
);
CREATE TABLE posts ( -- users_cities
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities,
  user_id INTEGER NOT NULL REFERENCES users,
  title VARCHAR(200) NOT NULL CHECK (x != ''),
  body TEXT NOT NULL CHECK (x != ''),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,

  post_id INTEGER NOT NULL REFERENCES posts,
  user_id INTEGER NOT NULL REFERENCES users

);
