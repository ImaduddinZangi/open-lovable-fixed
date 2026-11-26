// Zangineer fix: older API routes (file list, ZIP download, logs, package install) still read
// `global.activeSandbox` in the old Vercel-style shape: runCommand({ cmd, args }) -> { exitCode, stdout(), stderr() }.
// The current flow only sets `global.activeSandboxProvider`, so those routes failed with "No active sandbox".
// This adapter exposes the active provider in that old shape, so every route works with E2B and Vercel.

const quote = (s: string) => (/^[A-Za-z0-9_\-./=:%@,+]+$/.test(s) ? s : `'${s.replace(/'/g, `'\\''`)}'`);

export function legacySandboxFor(provider: any): any {
  const sb = provider?.sandbox;
  if (!sb) return null;
  // Vercel sandboxes already have the old shape
  if (typeof sb.runCommand === 'function' && !sb.commands) return sb;
  return {
    sandboxId: provider.getSandboxInfo?.()?.sandboxId,
    async runCommand(opts: { cmd: string; args?: string[]; cwd?: string } | string) {
      const line = typeof opts === 'string' ? opts : [opts.cmd, ...(opts.args || [])].map(quote).join(' ');
      const cwd = (typeof opts === 'object' && opts.cwd) || '/home/user/app';
      let r: any;
      try {
        r = await sb.commands.run(line, { cwd, timeoutMs: 120000 });
      } catch (e: any) {
        r = { exitCode: e?.exitCode ?? 1, stdout: e?.stdout ?? '', stderr: e?.stderr ?? String(e?.message || e) };
      }
      return { exitCode: r.exitCode ?? 0, stdout: async () => r.stdout ?? '', stderr: async () => r.stderr ?? '' };
    },
    async stop() {
      await provider.terminate();
    },
  };
}
