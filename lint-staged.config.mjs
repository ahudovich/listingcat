import path from 'node:path'

const buildEslintCommand = (filenames) =>
  `doppler run -p lc-main -c dev -- next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const config = {
  '*.{ts,tsx}': [() => 'tsc -p tsconfig.json --noEmit', buildEslintCommand],
  '*.{js,mjs,cjs,ts,tsx,css}': ['prettier --check .'],
}

export default config
