module.exports = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0, // 0 means unset
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    skipAudits: ['uses-http2'], // Skip HTTP/2 check for local development
  },
  categories: {
    performance: {
      auditRefs: [
        { id: 'first-contentful-paint', weight: 10 },
        { id: 'largest-contentful-paint', weight: 25 },
        { id: 'cumulative-layout-shift', weight: 25 },
        { id: 'total-blocking-time', weight: 30 },
        { id: 'speed-index', weight: 10 },
      ],
    },
  },
  audits: [
    { path: 'metrics/first-contentful-paint' },
    { path: 'metrics/largest-contentful-paint' },
    { path: 'metrics/cumulative-layout-shift' },
    { path: 'metrics/total-blocking-time' },
    { path: 'metrics/speed-index' },
    { path: 'metrics/time-to-interactive' },
    { path: 'diagnostics/uses-optimized-images' },
    { path: 'diagnostics/uses-responsive-images' },
    { path: 'diagnostics/efficient-animated-content' },
    { path: 'diagnostics/duplicated-javascript' },
    { path: 'diagnostics/legacy-javascript' },
  ],
};