import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const imgRegex = /<img\s+([^>]+)>/g;
let match;
let total = 0;
let missingAlt = 0;
let missingFiles = 0;

while ((match = imgRegex.exec(html)) !== null) {
  total++;
  const tagAttrs = match[1];
  const srcMatch = tagAttrs.match(/src=["']([^"']+)["']/);
  const altMatch = tagAttrs.match(/alt=["']([^"']*)["']/);

  if (!altMatch || altMatch[1].trim() === '') {
    missingAlt++;
    console.log(`[Missing/Empty Alt] ${match[0]}`);
  }

  if (srcMatch) {
    const src = srcMatch[1];
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      if (!fs.existsSync(src)) {
        missingFiles++;
        console.log(`[Missing File] ${src}`);
      }
    }
  }
}

console.log(`\nImage Audit Summary:`);
console.log(`- Total images: ${total}`);
console.log(`- Missing/empty alt tags: ${missingAlt}`);
console.log(`- Missing file assets: ${missingFiles}`);

// Check headings
const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
console.log(`\nHeading Audit:`);
console.log(`- <h1> count: ${h1s.length} (Expected: 1)`);
if (h1s.length > 0) {
  console.log(`  Content: "${h1s[0][1].replace(/<[^>]+>/g, '').trim()}"`);
}
