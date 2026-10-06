/**
 * Client and Server AI invocation layer
 * Connects directly to Nebius Token Factory with NVIDIA Nemotron
 * Includes zero-latency local fallback for GitHub Pages & static export
 */

import { NebiusNemotronClient } from '@repomind/ai';

const localClient = new NebiusNemotronClient();

export interface AIResponse<T = any> {
  success: boolean;
  data: T;
  model: string;
  latencyMs: number;
}

export async function requestAI<T = any>(action: string, payload: any): Promise<T> {
  const startTime = Date.now();

  // Try API route first if available
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload }),
    });

    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    // Falls through to client-side fallback
  }

  // Direct client-side engine (works seamlessly on GitHub Pages static deployment)
  try {
    let result: any = null;

    switch (action) {
      case 'explain_simply':
        result = await localClient.explainSimply(payload.issue || {}, payload.language || 'en');
        break;

      case 'claim_check':
        result = await localClient.checkClaim(payload.issue || {});
        break;

      case 'match_score':
        result = await localClient.calculateMatchScore(payload.userProfile || {}, payload.issue || {});
        break;

      case 'mission_plan':
        result = await localClient.generateMissionPlan(payload.title || '', payload.repo || '');
        break;

      case 'review_diff':
        result = await localClient.reviewDiff(payload.diff || '');
        break;

      case 'generate_pr':
        result = await localClient.generatePR(payload.title || '', payload.repo || '', payload.branch || 'main');
        break;

      case 'debug_error':
        result = await localClient.debugError(payload.errorText || '');
        break;

      case 'screenshot_to_issue':
        result = await localClient.convertScreenshotToIssue(payload.imageDescription || '');
        break;

      case 'linkedin_post':
        result = await localClient.generateLinkedInPost(payload.contribution || {}, payload.mode || 'professional');
        break;

      default:
        throw new Error(`Unknown AI action: ${action}`);
    }

    return result as T;
  } catch (err) {
    console.error(`AI fallback error for ${action}:`, err);
    throw err;
  }
}
