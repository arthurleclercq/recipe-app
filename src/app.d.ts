import type { SessionData } from '$lib/server/sessionStore';

declare global {
  namespace App {
    interface Locals {
      user?: SessionData;
    }
  }
}

export {};