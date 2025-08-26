const fs = require('fs');
const path = require('path');

// Read and parse mockTools.ts
const mockToolsPath = path.join(__dirname, '../src/data/mockTools.ts');
const content = fs.readFileSync(mockToolsPath, 'utf-8');

// Extract the toolsData array content
const toolsDataMatch = content.match(/export const toolsData = \[([\s\S]*?)\];/);
if (!toolsDataMatch) {
  console.error('Could not find toolsData in mockTools.ts');
  process.exit(1);
}

const toolsDataContent = toolsDataMatch[1];

// Extract all feature strings and descriptions
const allText = [];

// Parse features arrays
const featureMatches = toolsDataContent.matchAll(/"features":\s*\[(.*?)\]/g);
for (const match of featureMatches) {
  const featuresBlock = match[1];
  const stringMatches = featuresBlock.matchAll(/"([^"]+)"/g);
  for (const strMatch of stringMatches) {
    allText.push(strMatch[1]);
  }
}

// Parse descriptions
const descriptionMatches = toolsDataContent.matchAll(/"description":\s*"([^"]+)"/g);
for (const match of descriptionMatches) {
  allText.push(match[1]);
}

// Also check the category tags helper
const categoryTagsMatch = content.match(/const categoryTags[\s\S]*?\{([\s\S]*?)\}/);
if (categoryTagsMatch) {
  const tagMatches = categoryTagsMatch[1].matchAll(/'([^']+)'/g);
  for (const match of tagMatches) {
    allText.push(match[1]);
  }
}

// Tokenize and count frequency
const tokenFrequency = {};

allText.forEach(text => {
  // Split by non-letters, convert to lowercase, filter > 3 chars
  const tokens = text
    .split(/[^a-zA-Z]+/)
    .map(t => t.toLowerCase())
    .filter(t => t.length > 3 && t !== 'with' && t !== 'from' && t !== 'your' && t !== 'help' && t !== 'text');
  
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

// Suggest new feature definitions based on actual findings
console.log('\n\nSuggested new feature definitions for featureDictionary.ts:');
console.log('(Add these to FEATURE_DICTIONARY under Capabilities group)\n');

// Filter for meaningful technical capabilities
const technicalTokens = sortedTokens
  .map(([token]) => token)
  .filter(token => {
    const techWords = [
      'code', 'video', 'chat', 'writing', 'design', 'grammar',
      'motion', 'search', 'visual', 'content', 'workflow',
      'analysis', 'assistant', 'creative', 'animation',
      'programming', 'conversational', 'organization'
    ];
    return techWords.includes(token);
  });

console.log('Based on actual frequency analysis:\n');
technicalTokens.slice(0, 10).forEach((token, idx) => {
  const key = token.replace(/-/g, '_') + '_support';
  const label = token.charAt(0).toUpperCase() + token.slice(1) + ' Support';
  console.log(`  { key:'${key}', label:'${label}', type:'bool', group:'Capabilities', sort: ${80 + idx * 10} },`);
});