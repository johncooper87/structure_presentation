const path = require('path');
const { execSync } = require('child_process');

const stagedFiles = execSync('git diff --diff-filter=d --cached --name-only')
  .toString()
  .split('\n')
  .filter((file) => file && ['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file)));
try {
  execSync(`npx eslint ${stagedFiles.join(' ')}`, { stdio: 'inherit' });
} catch (err) {
  process.exit(1);
}
