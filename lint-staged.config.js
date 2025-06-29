import path from 'node:path'

const buildEslintCommand = (filenames) =>
  `doppler run -p lc-main -c dev -- next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const config = {
  '*.{ts,tsx}': [buildEslintCommand],
  '*.{js,ts,tsx,css}': ['prettier --check .'],
}

export default config
