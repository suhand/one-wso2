// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

// Shared HTTP primitives. Every feature slice that fetches from a backend
// should import from here so retry policies, error typing, and Bearer /
// x-jwt-assertion contract stay consistent across the app.
//
// The global QueryClient in AppWithConfig keys its retry logic off
// `HttpError.status`, so features MUST throw HttpError (or subclasses) on
// non-2xx to get the right retry behavior. authedGet does this for you.

// Thrown by authedGet on non-2xx responses. Carries the HTTP status so
// retry logic (both per-query in features and global in AppWithConfig)
// can key off it without regex-parsing the message.
//
// The user-facing `.message` intentionally omits the raw response body —
// backend diagnostics can leak stack traces / internal identifiers and
// this Error can surface in UI error banners. Sanitized body is preserved
// on `.responseBody` for controlled dev logging (see authedGet) but never
// in the message.
export class HttpError extends Error {
  readonly status: number;
  readonly url: string;
  readonly responseBody: string;
  constructor(url: string, status: number, body: string) {
    super(`Request failed with HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.responseBody = body;
  }
}

// Authed GET — Bearer <Asgardeo id_token>. Same header shape people-app's
// axios interceptor sets (Choreo's gateway rewrites this into
// x-jwt-assertion for the backend's JwtInterceptor).
//
// No Content-Type header on GET: with no body the header is meaningless
// and makes the request non-simple, forcing an unnecessary CORS preflight.
// `extraHeaders` lets specific callers (e.g. promotion-app, which requires
// `x-user-timezone-offset`) add per-backend quirks without polluting the
// core helper.
export async function authedGet<T>(
  url: string,
  idToken: string,
  extraHeaders?: Record<string, string>,
): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${idToken}`, ...(extraHeaders ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Dev-only console log — never render `body` in the UI.
    if (import.meta.env.DEV && body) {
      console.warn(`[authedGet] ${url} → HTTP ${res.status}: ${body.slice(0, 400)}`);
    }
    throw new HttpError(url, res.status, body);
  }
  return res.json() as Promise<T>;
}

// Authed POST with a JSON body. Returns parsed JSON when the response has
// a body, or null on 201/204. Same error semantics as authedGet.
export async function authedPost<T>(url: string, idToken: string, body: unknown): Promise<T | null> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (import.meta.env.DEV && text) {
      console.warn(`[authedPost] ${url} → HTTP ${res.status}: ${text.slice(0, 400)}`);
    }
    throw new HttpError(url, res.status, text);
  }
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : null;
}

// Authed PATCH with a JSON body. Returns parsed JSON when the response has
// a body, or null on 204. Same error semantics as authedPost.
export async function authedPatch<T>(url: string, idToken: string, body: unknown): Promise<T | null> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (import.meta.env.DEV && text) {
      console.warn(`[authedPatch] ${url} → HTTP ${res.status}: ${text.slice(0, 400)}`);
    }
    throw new HttpError(url, res.status, text);
  }
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : null;
}

// Authed DELETE. Returns null; throws HttpError on non-2xx.
export async function authedDelete(url: string, idToken: string): Promise<void> {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    if (import.meta.env.DEV && body) {
      console.warn(`[authedDelete] ${url} → HTTP ${res.status}: ${body.slice(0, 400)}`);
    }
    throw new HttpError(url, res.status, body);
  }
}
