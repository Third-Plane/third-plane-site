// Packages the site as a single self-contained page for sharing: one
// index.html with the JS and CSS inlined, the brand images and icons beside
// it, and routing moved into the hash (window.__ARTIFACT__) so both pages
// work without a server. Output goes to package/ and package.zip.
//
//   npm run package
//
// Open package/index.html straight from disk, host the folder anywhere, or
// publish index.html plus the brand/ folder as a hosted page.

import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist-package')
const out = resolve(root, 'package')

rmSync(dist, { recursive: true, force: true })
rmSync(out, { recursive: true, force: true })
rmSync(resolve(root, 'package.zip'), { force: true })

// Relative base so every asset reference resolves beside index.html.
execSync('npx tsc -b && npx vite build --base ./ --outDir dist-package', { cwd: root, stdio: 'inherit' })

let html = readFileSync(resolve(dist, 'index.html'), 'utf8')
const assets = readdirSync(resolve(dist, 'assets'))
const js = assets.find((f) => f.endsWith('.js'))
const css = assets.find((f) => f.endsWith('.css'))

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/assets\/[^"]+\.css"[^>]*>/, () => `<style>\n${readFileSync(resolve(dist, 'assets', css), 'utf8')}\n</style>`)
html = html.replace(/<script type="module"[^>]*src="\.\/assets\/[^"]+\.js"[^>]*><\/script>/, () => `<script>window.__ARTIFACT__ = true</script>\n<script type="module">\n${readFileSync(resolve(dist, 'assets', js), 'utf8')}\n</script>`)

// The shared page is named like a product; the explainer lives in the meta
// description already in the head.
html = html.replace(/<title>[^<]*<\/title>/, '<title>Third Plane</title>')

mkdirSync(out, { recursive: true })
writeFileSync(resolve(out, 'index.html'), html)
cpSync(resolve(dist, 'brand'), resolve(out, 'brand'), { recursive: true })
for (const f of ['favicon.png', 'favicon-32.png', 'apple-touch-icon.png']) cpSync(resolve(dist, f), resolve(out, f))

execSync('zip -qr ../package.zip .', { cwd: out })
rmSync(dist, { recursive: true, force: true })
console.log(`Packaged to ${out} and ${resolve(root, 'package.zip')}`)
