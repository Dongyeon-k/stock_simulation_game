import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';

// dist 폴더 없으면 생성
if (!existsSync(dist)) {
  mkdirSync(dist, { recursive: true });
}

// 복사할 파일 목록
const filesToCopy = ['index.html', 'script.js'];

for (const file of filesToCopy) {
  const from = join('.', file);
  const to = join(dist, file);
  copyFileSync(from, to);
  console.log(`Copied ${from} -> ${to}`);
}
