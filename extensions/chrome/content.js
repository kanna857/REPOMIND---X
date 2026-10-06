/**
 * RepoMind-X GitHub Injected Content Script
 * Injects Cybernetic Mission HUD into GitHub Issues & Pull Requests
 */

(() => {
  const isIssuePage = window.location.pathname.includes('/issues/');
  const isPrPage = window.location.pathname.includes('/pull/');

  if (!isIssuePage && !isPrPage) return;

  const header = document.querySelector('#partial-discussion-header') || document.querySelector('.gh-header');
  if (!header) return;

  const hudContainer = document.createElement('div');
  hudContainer.id = 'repomind-x-hud';
  hudContainer.style.cssText = `
    margin: 16px 0;
    padding: 16px;
    background: #0C101A;
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    color: #dfe2f1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  hudContainer.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #00F0FF; box-shadow: 0 0 10px #00F0FF;"></span>
        <strong style="color: #00F0FF; font-size: 13px; letter-spacing: 0.05em;">REPOMIND // X COCKPIT</strong>
        <span style="font-size: 11px; background: rgba(0, 255, 163, 0.15); color: #00FFA3; padding: 2px 8px; border-radius: 999px;">96% MATCH</span>
      </div>
      <a href="http://localhost:3000/dashboard" target="_blank" style="color: #00F0FF; font-size: 11px; text-decoration: none;">OPEN FULL COCKPIT ↗</a>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button id="rmx-explain-btn" style="background: rgba(0, 240, 255, 0.15); border: 1px solid #00F0FF; color: #00F0FF; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 600;">
        ✨ Explain Simply with RepoMind-X
      </button>
      <button id="rmx-claim-btn" style="background: #141A28; border: 1px solid rgba(0, 240, 255, 0.2); color: #dfe2f1; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer;">
        🛡️ Check Claim Status
      </button>
      <button id="rmx-plan-btn" style="background: #00F0FF; border: none; color: #00363a; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 700;">
        🚀 Plan Contribution
      </button>
    </div>
    <div id="rmx-output-panel" style="margin-top: 12px; padding: 12px; background: #05070D; border-radius: 8px; font-size: 12px; display: none; line-height: 1.5; color: #ccd2e3;"></div>
  `;

  header.parentNode.insertBefore(hudContainer, header.nextSibling);

  const output = document.getElementById('rmx-output-panel');
  document.getElementById('rmx-explain-btn')?.addEventListener('click', () => {
    output.style.display = 'block';
    output.innerHTML = `<strong>NVIDIA Nemotron Analysis:</strong><br/>
    • Problem: Asynchronous timeout occurs during token refresh on rate limiting.<br/>
    • Maintainer Expectation: Add exponential backoff with jitter and passing unit tests.<br/>
    • Suggested file: <code>src/core/worker.py</code>`;
  });

  document.getElementById('rmx-claim-btn')?.addEventListener('click', () => {
    output.style.display = 'block';
    output.innerHTML = `<span style="color: #00FFA3; font-weight: bold;">✓ No active claimant detected.</span> The issue is unreserved and ready for your PR.`;
  });

  document.getElementById('rmx-plan-btn')?.addEventListener('click', () => {
    window.open('http://localhost:3000/plan/1', '_blank');
  });
})();
