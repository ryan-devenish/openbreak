const STORAGE_KEY = 'openbreak.recentBreaks';
const MAX_RECENTS = 6;

export function getRecentlyViewedBreakSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function recordRecentlyViewedBreak(slug: string) {
  if (typeof window === 'undefined') return;
  try {
    const next = [slug, ...getRecentlyViewedBreakSlugs().filter((item) => item !== slug)].slice(0, MAX_RECENTS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Browsing must continue even when storage is blocked or unavailable.
  }
}
