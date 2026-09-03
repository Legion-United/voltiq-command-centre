import { NextRequest, NextResponse } from "next/server";

// Legion United demo-hub access gate.
// A visitor only reaches this demo through the hub's /api/go hop, which appends
// a short-lived signed token (?lu_access=...). We validate it, drop a 30-day
// session cookie for this domain, and strip the param. No token, no cookie -> the
// visitor is sent back to the hub gate. Token contract matches the hub's
// api/_lib/token.js exactly (HMAC-SHA256 over base64url(payload)).
//
// Open-until-configured: while DEMO_SESSION_SECRET is unset the demo stays fully
// open (no regression); the gate switches on the moment the secret is present.
const COOKIE = "lu_session";
const PARAM = "lu_access";
const HUB = "https://demo.legion-united.com";
const DAY = 86400;

function b64urlToBytes(str: string): Uint8Array<ArrayBuffer> {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  const bin = atob(s);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

function bytesToB64url(b: Uint8Array): string {
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importKey(secret: string, usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usage
  );
}

async function verifyToken(token: string | undefined, secret: string): Promise<any | null> {
  if (!secret || !token || token.indexOf(".") === -1) return null;
  const [body, sig] = token.split(".");
  try {
    const key = await importKey(secret, ["verify"]);
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(sig),
      new TextEncoder().encode(body)
    );
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(body)));
    if (payload.x && Math.floor(Date.now() / 1000) > payload.x) return null;
    return payload;
  } catch {
    return null;
  }
}

async function signSession(email: string, secret: string): Promise<string> {
  const payload = { e: email, p: "session", x: Math.floor(Date.now() / 1000) + 30 * DAY };
  const body = bytesToB64url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await importKey(secret, ["sign"]);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return body + "." + bytesToB64url(new Uint8Array(sigBuf));
}

export async function proxy(req: NextRequest) {
  const secret = process.env.DEMO_HUB_SECRET_V2 || "";

  // Not configured yet -> stay open so nothing breaks. Gate activates once the
  // shared secret is set on this project.
  if (!secret) return NextResponse.next();

  const session = await verifyToken(req.cookies.get(COOKIE)?.value, secret);
  if (session && session.p === "session") return NextResponse.next();

  const url = req.nextUrl;
  const access = url.searchParams.get(PARAM);
  if (access) {
    const grant = await verifyToken(access, secret);
    if (grant && grant.p === "access" && grant.e) {
      const clean = url.clone();
      clean.searchParams.delete(PARAM);
      const res = NextResponse.redirect(clean);
      res.cookies.set(COOKIE, await signSession(grant.e, secret), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 30 * DAY,
        path: "/",
      });
      return res;
    }
  }

  return NextResponse.redirect(new URL("/", HUB));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|map|txt|xml|woff|woff2|ttf|otf)).*)",
  ],
};
