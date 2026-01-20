import crypto from 'crypto';

// Generate unique backup codes
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
  }
  return codes;
}

// Format backup code for comparison
export function formatBackupCode(code: string): string {
  return code.replace(/[-\s]/g, '').toUpperCase();
}
