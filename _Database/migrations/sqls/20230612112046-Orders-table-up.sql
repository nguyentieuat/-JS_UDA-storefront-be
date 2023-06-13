CREATE TYPE statusOrder AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status statusOrder NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);