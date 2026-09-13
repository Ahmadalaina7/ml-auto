type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return true;
  }

  if (buckets.size > 10_000) {
    const nowStamp = Date.now();
    for (const [k, v] of buckets) {
      if (v.resetAt <= nowStamp) buckets.delete(k);
    }
  }

  return false;
}