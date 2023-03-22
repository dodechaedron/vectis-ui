export const waitForDocument = async (): Promise<void> => {
  if (document.readyState === "complete") return;
  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (event.target && (event.target as Document).readyState === "complete") {
        resolve();
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err: unknown) {}
};

export function IntlNumber(number: string | number) {
  const language = window.navigator.language;
  return new Intl.NumberFormat(language).format(parseInt(String(number)));
}

export function IntlAddress(address: string, length = 8): string {
  return address.slice(0, 8).concat("...") + address.substring(address.length - length);
}

export function IntlDate(date: string | number) {
  const language = window.navigator.language;
  return new Intl.DateTimeFormat(language).format(new Date(date));
}

export function IntlTimeAgo(date: string | number | Date, lang = navigator.language) {
  const timeMs = new Date(date).getTime();

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

 const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
