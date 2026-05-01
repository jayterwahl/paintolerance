import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/utils/define-background';

const QA_ENDPOINTS = [
  'http://localhost:47831/report',
  'http://127.0.0.1:47831/report',
] as const;

interface QaReportMessage {
  type: 'pain-tolerance:qa-report';
  report: unknown;
}

interface QaReportResponse {
  ok: boolean;
  endpoint?: string;
  error?: string;
}

function isQaReportMessage(message: unknown): message is QaReportMessage {
  return typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    (message as { type?: unknown }).type === 'pain-tolerance:qa-report' &&
    'report' in message;
}

async function postQaReport(report: unknown): Promise<QaReportResponse> {
  const payload = JSON.stringify(report);
  const errors: string[] = [];

  for (const endpoint of QA_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
      });

      if (!response.ok) {
        errors.push(`${endpoint}: HTTP ${response.status}`);
        continue;
      }

      return { ok: true, endpoint };
    } catch (error) {
      errors.push(`${endpoint}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return { ok: false, error: errors.join('\n') };
}

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (!isQaReportMessage(message)) return undefined;
    return postQaReport(message.report);
  });
});
