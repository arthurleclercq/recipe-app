// src/lib/auth.ts
import { init } from '@auth/sveltekit';
import { query } from '$lib/db';
import bcrypt from 'bcrypt';
import cookie from 'cookie';

export const { handle } = init({
    providers: [],
    callbacks: {
        async signIn({ user, credentials }) {
            const result = await query('SELECT * FROM utilisateurs WHERE nom_utilisateur = $1', [credentials.username]);
            const userRecord = result.rows[0];
            if (userRecord && await bcrypt.compare(credentials.password, userRecord.password)) {
                return { id: userRecord.id, username: userRecord.username };
            }
            return null;
        },
        async session({ session, user }) {
            session.user = user;
            return session;
        },
    },
});