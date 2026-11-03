// Uploads everything in public/images and public/videos to Cloudinary under
// the "luxakari/" folder, keeping the file name (without extension) as the
// public id, e.g. public/images/logo.png -> luxakari/images/logo
//
// Usage: node scripts/upload-media.mjs [--force] [name ...]
//   (reads credentials from .env.local; existing assets are skipped unless
//   --force; pass file names like "logo.png" to upload only those)
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";

for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
if (!cloud || !key || !secret) throw new Error("Missing CLOUDINARY_* env vars");

const CHUNK = 20 * 1024 * 1024;

function sign(params) {
  const str = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(str + secret).digest("hex");
}

async function exists(type, publicId) {
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/resources/${type}/upload/${encodeURIComponent(publicId).replace(/%2F/g, "/")}`,
    { headers: { Authorization: `Basic ${auth}` } },
  );
  return res.ok;
}

async function upload(file, type, publicId) {
  const params = { overwrite: "true", public_id: publicId, timestamp: Math.floor(Date.now() / 1000) };
  const signature = sign(params);
  const buf = readFileSync(file);
  const url = `https://api.cloudinary.com/v1_1/${cloud}/${type}/upload`;
  const uniqueId = `${publicId.replace(/\W/g, "_")}_${Date.now()}`;
  let json;
  for (let start = 0; start < buf.length; start += CHUNK) {
    const end = Math.min(start + CHUNK, buf.length);
    const form = new FormData();
    for (const [k, v] of Object.entries(params)) form.append(k, String(v));
    form.append("api_key", key);
    form.append("signature", signature);
    form.append("file", new Blob([buf.subarray(start, end)]), path.basename(file));
    const headers = {};
    if (buf.length > CHUNK) {
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["Content-Range"] = `bytes ${start}-${end - 1}/${buf.length}`;
    }
    const res = await fetch(url, { method: "POST", body: form, headers });
    json = await res.json();
    if (!res.ok) throw new Error(`${file}: ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const jobs = [];
for (const [dir, type] of [["images", "image"], ["videos", "video"]]) {
  const abs = path.join("public", dir);
  if (!existsSync(abs)) continue;
  for (const name of readdirSync(abs)) {
    const file = path.join(abs, name);
    if (!statSync(file).isFile()) continue;
    if (only.length && !only.includes(name)) continue;
    jobs.push({ file, type, publicId: `luxakari/${dir}/${path.parse(name).name}` });
  }
}

let failed = 0;
for (const { file, type, publicId } of jobs) {
  try {
    if (!force && (await exists(type, publicId))) {
      console.log(`skip    ${publicId}`);
      continue;
    }
    const r = await upload(file, type, publicId);
    console.log(`ok      ${publicId} -> ${r.secure_url}`);
  } catch (e) {
    failed++;
    console.error(`FAILED  ${e.message}`);
  }
}
process.exit(failed ? 1 : 0);
