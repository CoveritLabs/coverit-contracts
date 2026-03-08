// Auto-generates gen/ts/index.ts barrel file after buf generate.
// Scans gen/ts/ for all *_pb.ts files and re-exports them.

import { readdirSync, writeFileSync } from 'fs';
import { join, relative, posix } from 'path';

const GEN_DIR = 'gen/ts';

function findPbFiles(dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findPbFiles(full));
        } else if (entry.name.endsWith('_pb.ts')) {
            results.push(full);
        }
    }
    return results;
}

const files = findPbFiles(GEN_DIR)
    .map((f) => './' + relative(GEN_DIR, f).replace(/\\/g, '/').replace(/\.ts$/, ''))
    .sort();

const content = files.map((f) => `export * from '${f}';`).join('\n') + '\n';
writeFileSync(join(GEN_DIR, 'index.ts'), content);
console.log(`Generated ${GEN_DIR}/index.ts with ${files.length} re-exports`);
