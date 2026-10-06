import { NextResponse } from 'next/server';
import { NebiusNemotronClient } from '@repomind/ai';

const aiClient = new NebiusNemotronClient();

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const { action, payload } = await req.json();

    let result: any = null;

    switch (action) {
      case 'explain_simply':
        result = await aiClient.explainSimply(payload.issue, payload.language || 'en');
        break;

      case 'claim_check':
        result = await aiClient.checkClaim(payload.issue);
        break;

      case 'match_score':
        result = await aiClient.calculateMatchScore(payload.userProfile || {}, payload.issue || {});
        break;

      case 'mission_plan':
        result = await aiClient.generateMissionPlan(payload.title, payload.repo);
        break;

      case 'review_diff':
        result = await aiClient.reviewDiff(payload.diff || '');
        break;

      case 'generate_pr':
        result = await aiClient.generatePR(payload.title, payload.repo, payload.branch || 'main');
        break;

      case 'debug_error':
        result = await aiClient.debugError(payload.errorText || '');
        break;

      case 'screenshot_to_issue':
        result = await aiClient.convertScreenshotToIssue(payload.imageDescription || '');
        break;

      case 'linkedin_post':
        result = await aiClient.generateLinkedInPost(payload.contribution, payload.mode || 'professional');
        break;

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    const latencyMs = Date.now() - startTime;
    return NextResponse.json({
      success: true,
      data: result,
      model: process.env.NEBIUS_MODEL || 'nvidia/llama-3.1-nemotron-70b-instruct',
      latencyMs,
    });
  } catch (error: any) {
    console.error('API /api/ai error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
