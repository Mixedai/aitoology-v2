#!/usr/bin/env node

const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    port: chrome.port,
    configPath: path.join(__dirname, '../lighthouse.config.js'),
  };

  const runnerResult = await lighthouse('http://localhost:5173', options);

  // Save results
  const reportHtml = runnerResult.report[0];
  const reportJson = runnerResult.report[1];
  
  // Create reports directory if it doesn't exist
  const reportsDir = path.join(__dirname, '../lighthouse-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  // Save HTML report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(
    path.join(reportsDir, `report-${timestamp}.html`),
    reportHtml
  );

  // Save JSON report
  const jsonReport = JSON.parse(reportJson);
  fs.writeFileSync(
    path.join(reportsDir, `report-${timestamp}.json`),
    JSON.stringify(jsonReport, null, 2)
  );

  // Print summary
  console.log('\n📊 Lighthouse Audit Results:');
  console.log('═══════════════════════════════');
  
  const categories = jsonReport.categories;
  Object.keys(categories).forEach(key => {
    const category = categories[key];
    const score = Math.round(category.score * 100);
    const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`${emoji} ${category.title}: ${score}/100`);
  });

  console.log('\n📈 Core Web Vitals:');
  console.log('═══════════════════════════════');
  
  const audits = jsonReport.audits;
  const metrics = {
    'first-contentful-paint': 'FCP',
    'largest-contentful-paint': 'LCP',
    'cumulative-layout-shift': 'CLS',
    'total-blocking-time': 'TBT',
    'speed-index': 'Speed Index',
    'time-to-interactive': 'TTI',
  };

  Object.keys(metrics).forEach(key => {
    if (audits[key]) {
      const audit = audits[key];
      const value = audit.displayValue || audit.numericValue;
      const score = Math.round(audit.score * 100);
      const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
      console.log(`${emoji} ${metrics[key]}: ${value} (Score: ${score}/100)`);
    }
  });

  console.log(`\n📁 Reports saved to: ${reportsDir}`);
  console.log(`   - HTML: report-${timestamp}.html`);
  console.log(`   - JSON: report-${timestamp}.json`);

  await chrome.kill();
  
  // Return score for CI/CD
  return categories.performance.score;
}

// Run if called directly
if (require.main === module) {
  console.log('🚀 Starting Lighthouse audit...\n');
  console.log('⚠️  Make sure your development server is running on http://localhost:5173\n');
  
  runLighthouse()
    .then(score => {
      const threshold = 0.9; // 90% threshold
      if (score < threshold) {
        console.log(`\n⚠️  Performance score ${Math.round(score * 100)}% is below threshold ${Math.round(threshold * 100)}%`);
        process.exit(1);
      } else {
        console.log(`\n✅ Performance score ${Math.round(score * 100)}% meets threshold!`);
        process.exit(0);
      }
    })
    .catch(err => {
      console.error('Error running Lighthouse:', err);
      process.exit(1);
    });
}

module.exports = { runLighthouse };