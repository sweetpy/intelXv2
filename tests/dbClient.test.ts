import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFrom = vi.fn();

vi.mock('../src/lib/supabase', () => ({
  supabase: { from: mockFrom }
}));

import { dbClient } from '../src/lib/dbClient';

describe('dbClient', () => {
  beforeEach(() => {
    mockFrom.mockReset();
  });

  it('creates a record', async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: '1' }, error: null });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    mockFrom.mockReturnValue({ insert });

    const result = await dbClient.create<any>('items', { name: 'Item' });

    expect(mockFrom).toHaveBeenCalledWith('items');
    expect(insert).toHaveBeenCalledWith({ name: 'Item' });
    expect(result).toEqual({ id: '1' });
  });

  it('reads records with filters', async () => {
    const eq = vi.fn().mockReturnThis();
    const mockQuery: any = {
      eq,
      then: (resolve: any) => Promise.resolve({ data: [{ id: '1' }], error: null }).then(resolve)
    };
    const select = vi.fn(() => mockQuery);
    mockFrom.mockReturnValue({ select });

    const result = await dbClient.read<any>('items', { status: 'active' });

    expect(mockFrom).toHaveBeenCalledWith('items');
    expect(eq).toHaveBeenCalledWith('status', 'active');
    expect(result).toEqual([{ id: '1' }]);
  });

  it('updates a record', async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: '1', name: 'Updated' }, error: null });
    const select = vi.fn(() => ({ single }));
    const eq = vi.fn(() => ({ select }));
    const update = vi.fn(() => ({ eq }));
    mockFrom.mockReturnValue({ update });

    const result = await dbClient.update<any>('items', '1', { name: 'Updated' });

    expect(mockFrom).toHaveBeenCalledWith('items');
    expect(update).toHaveBeenCalledWith({ name: 'Updated' });
    expect(eq).toHaveBeenCalledWith('id', '1');
    expect(result).toEqual({ id: '1', name: 'Updated' });
  });

  it('removes a record', async () => {
    const eq = vi.fn().mockResolvedValue({ error: null });
    const del = vi.fn(() => ({ eq }));
    mockFrom.mockReturnValue({ delete: del });

    const result = await dbClient.remove('items', '1');

    expect(mockFrom).toHaveBeenCalledWith('items');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', '1');
    expect(result).toBe(true);
  });
});
