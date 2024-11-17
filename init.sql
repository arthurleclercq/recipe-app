CREATE TABLE recettes (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  temps_preparation INTEGER NOT NULL,
  vues INTEGER DEFAULT 0,
  categorie VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createur_id int references utilisateurs(id) NOT NULL,
);

CREATE TABLE utilisateurs (
  id SERIAL PRIMARY KEY,
  nom_utilisateur VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL, -- mot de passe haché
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY, 
  utilisateur_id INT NOT NULL REFERENCES utilisateurs(id), 
  date_expiration TIMESTAMP NOT NULL,  
  data JSONB
);