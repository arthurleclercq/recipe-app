import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { deleteSession } from '$lib/stores/sessionStore';
import {userStore} from '$lib/stores/userStore';

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get('sessionId');
  
  if (sessionId) {
    await deleteSession(sessionId);
    cookies.delete('sessionId', { path: '/' });
    
    userStore.set(null)
  }

  return json({ success: true });
};