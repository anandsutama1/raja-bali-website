import crypto from "crypto";

// No 0/O/1/I — a reference gets read aloud and typed from WhatsApp
// messages, so characters that look alike are left out. 32 symbols also
// divides a random byte evenly (256 / 32), so there's no modulo bias.
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const REF_PATTERN = /^GRP-\d{4}-[A-Z2-9]{6}$/;

export const LINK_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function generateReference(now = new Date()) {
  const yymm = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
  let suffix = "";
  for (const byte of crypto.randomBytes(6)) suffix += REF_ALPHABET[byte % REF_ALPHABET.length];
  return `GRP-${yymm}-${suffix}`;
}

function linkSecret() {
  const secret = process.env.DEPOSIT_LINK_SECRET;
  if (!secret) throw new Error("DEPOSIT_LINK_SECRET is not configured.");
  return secret;
}

function canonical({ ref, usd, idr, exp }) {
  return [ref, Number(usd).toFixed(2), String(Math.round(Number(idr))), String(exp)].join("|");
}

// The pay link carries the amount itself, signed — so /pay never has to
// look anything up, and a guest editing ?usd= in the address bar just
// invalidates the signature instead of paying less.
export function signDepositLink(params) {
  return crypto.createHmac("sha256", linkSecret()).update(canonical(params)).digest("hex");
}

export function verifyDepositLink({ ref, usd, idr, exp, sig }) {
  if (typeof ref !== "string" || !REF_PATTERN.test(ref) || typeof sig !== "string") {
    return { valid: false, reason: "invalid" };
  }
  const usdNum = Number(usd);
  const idrNum = Number(idr);
  const expNum = Number(exp);
  if (![usdNum, idrNum, expNum].every(Number.isFinite) || usdNum <= 0 || idrNum <= 0) {
    return { valid: false, reason: "invalid" };
  }

  const expected = Buffer.from(signDepositLink({ ref, usd: usdNum, idr: idrNum, exp: expNum }), "hex");
  let provided;
  try {
    provided = Buffer.from(sig, "hex");
  } catch {
    return { valid: false, reason: "invalid" };
  }
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return { valid: false, reason: "invalid" };
  }
  if (expNum < Date.now()) return { valid: false, reason: "expired" };

  return { valid: true, ref, usd: Number(usdNum.toFixed(2)), idr: Math.round(idrNum), exp: expNum };
}

export function buildPayUrl({ locale, ref, usd, idr, exp, baseUrl }) {
  const sig = signDepositLink({ ref, usd, idr, exp });
  const query = new URLSearchParams({
    usd: Number(usd).toFixed(2),
    idr: String(Math.round(Number(idr))),
    exp: String(exp),
    sig,
  });
  return `${baseUrl}/${locale}/pay/${ref}?${query.toString()}`;
}

// Constant-time comparison for the shared staff password — hashing both
// sides first keeps timingSafeEqual happy (it needs equal-length buffers)
// without leaking the real password's length.
export function isStaffPasswordValid(candidate) {
  const expected = process.env.STAFF_PASSWORD;
  if (!expected || typeof candidate !== "string") return false;
  const a = crypto.createHash("sha256").update(candidate).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}
