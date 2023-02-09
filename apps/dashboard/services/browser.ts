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

export function IntlTimeAgo(date: string | number) {
  const DATE_UNITS = {
    year: 31536000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  const getUnitAndValueDate = (secondsElapsed: number) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
      if (Math.abs(secondsElapsed) >= secondsInUnit || unit === "second") {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
        return { value, unit };
      }
    }
  };

  const lg = window.navigator.language;
  const rtf = new Intl.RelativeTimeFormat();

  const secondsElapsed = (Date.now() - +new Date(date)) / 1000;
  const { value, unit } = getUnitAndValueDate(secondsElapsed)!;

  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit);
}
