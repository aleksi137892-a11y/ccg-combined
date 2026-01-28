/**
 * Generates and stores a session token for triage logging.
 * The token is stored in sessionStorage so it persists during the session
 * but is cleared when the tab/window is closed.
 */
export const getSessionToken = (): string => {
  const key = 'triage_session_token';
  let token = sessionStorage.getItem(key);
  if (!token) {
    token = crypto.randomUUID();
    sessionStorage.setItem(key, token);
  }
  return token;
};
