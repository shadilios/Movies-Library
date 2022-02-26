DROP TABLE IF EXISTS favoriteMoviesTable;

CREATE TABLE IF NOT EXISTS favoriteMoviesTable(
  id SERIAL PRIMARY KEY,    
  title VARCHAR(255),
  release_date VARCHAR(255),
  poster_path VARCHAR(1000),
  overview VARCHAR(10000),   
  comment VARCHAR(1000)
);