import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../src/hooks/useAuth';

describe('useAuth hook', () => {
  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });
});
