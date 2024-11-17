//src/hooks.server.ts
import { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { getSession } from '$lib/stores/sessionStore';
import {setUser} from '$lib/stores/userStore';

const sessionHandle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('sessionId');
  
  //console.log('SessionId from cookie:', sessionId); // Log pour vérifier

  if (sessionId) {
    const session = await getSession(sessionId);
    //console.log('Session data:', session); // Log pour vérifier
    if (session) {
      event.locals.user = session;
    } else {
      event.cookies.delete('sessionId', { path: '/' });
    }
  }

  const response = await resolve(event);
  return response;
};

export const handle = sequence(sessionHandle);