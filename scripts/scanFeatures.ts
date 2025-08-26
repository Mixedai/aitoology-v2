import * as fs from 'fs';
import * as path from 'path';

// Read and parse mockTools.ts
const mockToolsPath = path.join(__dirname, '../src/data/mockTools.ts');
const content = fs.readFileSync(mockToolsPath, 'utf-8');

// Extract all feature strings and descriptions using regex
const featureMatches = content.matchAll(/features:\s*\[([\s\S]*?)\]/g);
const descriptionMatches = content.matchAll(/description:\s*["'`](.*?)["'`]/g);

// Collect all text from features and descriptions
const allText: string[] = [];

// Process features
for (const match of featureMatches) {
  const featuresBlock = match[1];
  const stringMatches = featuresBlock.matchAll(/["'`](.*?)["'`]/g);
  for (const strMatch of stringMatches) {
    allText.push(strMatch[1]);
  }
}

// Process descriptions
for (const match of descriptionMatches) {
  allText.push(match[1]);
}

// Tokenize and count frequency
const tokenFrequency: Record<string, number> = {};

allText.forEach(text => {
  // Split by non-letters, convert to lowercase, filter > 3 chars
  const tokens = text
    .split(/[^a-zA-Z]+/)
    .map(t => t.toLowerCase())
    .filter(t => t.length > 3);
  
  tokens.forEach(token => {
    tokenFrequency[token] = (tokenFrequency[token] || 0) + 1;
  });
});

// Sort by frequency and get top 30
const sortedTokens = Object.entries(tokenFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

// Print results
console.log('Top 30 Feature Keywords from mockTools.ts:\n');
console.log('Token'.padEnd(20) + 'Count');
console.log('-'.repeat(30));

sortedTokens.forEach(([token, count]) => {
  console.log(token.padEnd(20) + count);
});

// Suggest new feature definitions
console.log('\n\nSuggested new feature definitions for featureDictionary.ts:');
console.log('(Add these to FEATURE_DICTIONARY under Capabilities group)\n');

const suggestedFeatures = [
  'code', 'vision', 'audio', 'video', 'voice', 'translate', 
  'chat', 'agent', 'automation', 'integration', 'collaboration',
  'real', 'time', 'generation', 'analysis', 'model'
].filter(token => sortedTokens.some(([t]) => t === token));

suggestedFeatures.forEach((token, idx) => {
  const key = token.replace(/-/g, '_');
  console.log(`  { key:'${key}_support', label:'${token.charAt(0).toUpperCase() + token.slice(1)} Support', type:'bool', group:'Capabilities', sort: ${80 + idx * 10} },`);
});