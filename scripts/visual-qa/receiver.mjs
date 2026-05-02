#!/usr/bin/env node
import { createServer } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PORT = Number(process.env.PT_QA_PORT || 47831);
const OUT_DIR = join(process.cwd(), '.wxt', 'qa-reports');

await mkdir(OUT_DIR, { recursive: true });

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

const server = createServer(async (req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/report') {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');

  let report;
  try {
    report = JSON.parse(raw);
  } catch (error) {
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.end(`invalid json: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = join(OUT_DIR, `${stamp}.json`);
  const latest = join(OUT_DIR, 'latest.json');
  const pretty = JSON.stringify(report, null, 2);

  await writeFile(path, pretty + '\n');
  await writeFile(latest, pretty + '\n');

  const fakeCount = Array.isArray(report.fakes) ? report.fakes.length : 0;
  const siblingCount = Array.isArray(report.siblings) ? report.siblings.length : 0;
  console.log(`[${new Date().toLocaleTimeString()}] report saved: ${path}`);
  console.log(`  reason=${report.reason} fakeCount=${fakeCount} siblingCount=${siblingCount} url=${report.url}`);

  res.writeHead(204);
  res.end();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Pain Tolerance visual QA receiver listening on http://127.0.0.1:${PORT}/report`);
  console.log(`Reports will be written to ${OUT_DIR}`);
});
