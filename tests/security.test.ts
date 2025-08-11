import { describe, it, expect, beforeAll } from 'vitest';

let encryptData: (data: string) => string;
let decryptData: (data: string) => string;
let validatePasswordStrength: (password: string) => { isValid: boolean };

beforeAll(async () => {
  process.env.VITE_ENCRYPTION_KEY = 'test-key';
  const mod = await import('../src/utils/security');
  encryptData = mod.encryptData;
  decryptData = mod.decryptData;
  validatePasswordStrength = mod.validatePasswordStrength;
});

describe('security utilities', () => {
  it('encrypts and decrypts data', () => {
    const plain = 'secret';
    const encrypted = encryptData(plain);
    expect(encrypted).not.toBe(plain);
    expect(decryptData(encrypted)).toBe(plain);
  });

  it('validates password strength', () => {
    const result = validatePasswordStrength('Weakpass1');
    expect(result.isValid).toBe(false);
  });
});
