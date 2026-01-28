/**
 * Ultra-simple Proof-of-Work challenge
 * 
 * This creates a minimal computational barrier (~100-300ms) that:
 * - Is invisible to legitimate users
 * - Blocks basic automated submissions
 * - Requires no third-party services
 * - Is privacy-preserving
 */

/**
 * Computes SHA-256 hash of a string
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a random challenge string
 */
export function generateChallenge(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Solves a proof-of-work challenge
 * 
 * Finds a nonce such that SHA256(challenge + nonce) starts with "00"
 * This requires ~256 iterations on average, taking ~100-300ms
 * 
 * @param challenge - The challenge string to solve
 * @returns Object containing the nonce solution and resulting hash
 */
export async function solveProofOfWork(challenge: string): Promise<{
  nonce: number;
  hash: string;
}> {
  let nonce = 0;
  const maxIterations = 100000; // Safety limit
  
  while (nonce < maxIterations) {
    const hash = await sha256(challenge + nonce);
    
    // Just 2 leading zeros = ~256 attempts on average
    if (hash.startsWith('00')) {
      return { nonce, hash };
    }
    
    nonce++;
    
    // Yield to main thread every 1000 iterations to keep UI responsive
    if (nonce % 1000 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  // Fallback if we hit the limit (shouldn't happen with just 2 zeros)
  throw new Error('Failed to solve proof-of-work');
}

/**
 * Verifies a proof-of-work solution
 * 
 * @param challenge - The original challenge
 * @param nonce - The claimed solution
 * @returns True if the solution is valid
 */
export async function verifyProofOfWork(
  challenge: string,
  nonce: number
): Promise<boolean> {
  const hash = await sha256(challenge + nonce);
  return hash.startsWith('00');
}
