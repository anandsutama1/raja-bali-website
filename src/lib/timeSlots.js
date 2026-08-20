// Hour-only slots spanning the restaurant's opening hours (12:00–22:00, see
// src/lib/site.js OPENING_HOURS). No minutes — reservations are taken on
// the hour.
export const OPENING_HOUR_SLOTS = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

// Local calendar date, not UTC. `new Date().toISOString()` reflects UTC,
// which drifts a day off the guest's actual local date depending on their
// timezone and time of day — used as a reservation date picker's `min`,
// that either blocks "today" or lets a day that's already past through.
export function todayLocalDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
