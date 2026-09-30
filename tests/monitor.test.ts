import { EscrowMonitor } from '../src/escrow/monitor';

describe('EscrowMonitor', () => {
  it('registers and fires event handlers', async () => {
    const monitor = new EscrowMonitor();
    let received: any = null;
    monitor.on('escrow.created', async e => { received = e; });
    // Simulate event
    const event = { type: 'escrow.created' as const, escrowId: '1', payload: {}, blockNumber: 1, txHash: 'abc', timestamp: Date.now() };
    const handlers = (monitor as any).handlers.get('escrow.created') as Set<any>;
    await Promise.all([...handlers].map((h: any) => h(event)));
    expect(received?.escrowId).toBe('1');
  });

  it('removes handler with off()', () => {
    const monitor = new EscrowMonitor();
    const h = () => {};
    monitor.on('escrow.created', h);
    monitor.off('escrow.created', h);
    expect((monitor as any).handlers.get('escrow.created')?.size).toBe(0);
  });

  it('unsubscribes all handlers with unsubscribeAll()', () => {
    const monitor = new EscrowMonitor();
    monitor.on('escrow.created', () => {});
    monitor.on('escrow.released', () => {});
    monitor.unsubscribeAll();
    expect((monitor as any).handlers.size).toBe(0);
  });

  it('stops polling and clears handlers on destroy()', () => {
    const monitor = new EscrowMonitor();
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    monitor.startPolling(5000, async () => []);
    monitor.on('escrow.created', () => {});
    monitor.destroy();
    expect((monitor as any).handlers.size).toBe(0);
    expect(clearIntervalSpy).toHaveBeenCalledWith((monitor as any).pollingInterval);
    clearIntervalSpy.mockRestore();
  });
});
