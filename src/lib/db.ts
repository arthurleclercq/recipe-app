import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'recettes',
  user: 'user',
  password: 'password'
});

// Fonction pour exécuter des requêtes SQL
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Fonction pour vérifier la connexion à la base de données
export async function checkDatabaseConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}