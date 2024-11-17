//src/lib/stores/sessionStore.ts
import { query } from '$lib/db';
import { v4 as uuidv4 } from 'uuid';

export interface SessionData {
  utilisateur_id: number;
  nom_utilisateur: string;
  [key: string]: any;
}



async function deleteAllUserSessions(utilisateur_id: number): Promise<void> {
    await query('DELETE FROM sessions WHERE utilisateur_id = $1', [utilisateur_id]);
}

  

export async function createSession(utilisateur_id: number, data: SessionData): Promise<string> {
    // D'abord, supprimer toutes les sessions existantes pour cet utilisateur
    await deleteAllUserSessions(utilisateur_id);
  
    const sessionId = uuidv4();
    const date_expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures à partir de maintenant
  
    await query(
      'INSERT INTO sessions (id, utilisateur_id, date_expiration, data) VALUES ($1, $2, $3, $4)',
      [sessionId, utilisateur_id, date_expiration, JSON.stringify(data)]
    );
    return sessionId;
  }

export async function getSession(sessionId: string): Promise<SessionData | null> {
  const result = await query(
    'SELECT data FROM sessions WHERE id = $1 AND date_expiration > NOW()',
    [sessionId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].data;
}

export async function updateSession(sessionId: string, data: Partial<SessionData>): Promise<void> {
  await query(
    'UPDATE sessions SET data = data || $1::jsonb WHERE id = $2',
    [JSON.stringify(data), sessionId]
  );
}

export async function deleteSession(sessionId: string): Promise<void> {
  await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
}

export async function cleanExpiredSessions(): Promise<void> {
  await query('DELETE FROM sessions WHERE date_expiration <= NOW()');
}