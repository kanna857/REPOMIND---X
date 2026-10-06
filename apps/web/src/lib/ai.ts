/**
 * Client and Server AI invocation layer
 * Connects directly to Nebius Token Factory with NVIDIA Nemotron
 */

export interface AIResponse<T = any> {
  success: boolean;
  data: T;
  model: string;
  latencyMs: number;
}

export async function requestAI<T = any>(action: string, payload: any): Promise<T> {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload }),
    });

    if (!res.ok) {
      throw new Error(`AI API failed: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`AI action ${action} failed:`, err);
    throw err;
  }
}
