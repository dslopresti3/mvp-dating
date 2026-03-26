export type IntentValue = "have_tickets" | "buy_tickets" | "exploring";
export type DateStyleValue = "one_on_one" | "group_hang" | "open_either";

export type MvpSelectionState = {
  eventId: string;
  intent: IntentValue;
  dateStyle: DateStyleValue;
};

const STORAGE_KEY = "mvp-dating-selection";

export const defaultSelectionState: MvpSelectionState = {
  eventId: "",
  intent: "buy_tickets",
  dateStyle: "one_on_one",
};

const isIntentValue = (value: string): value is IntentValue =>
  value === "have_tickets" || value === "buy_tickets" || value === "exploring";

const isDateStyleValue = (value: string): value is DateStyleValue =>
  value === "one_on_one" || value === "group_hang" || value === "open_either";

const normalizeSelection = (selection: Partial<MvpSelectionState>): MvpSelectionState => ({
  eventId: typeof selection.eventId === "string" ? selection.eventId : defaultSelectionState.eventId,
  intent: selection.intent && isIntentValue(selection.intent) ? selection.intent : defaultSelectionState.intent,
  dateStyle:
    selection.dateStyle && isDateStyleValue(selection.dateStyle)
      ? selection.dateStyle
      : defaultSelectionState.dateStyle,
});

const readStorageValue = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStorageValue = (value: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage can fail in private mode or when storage is blocked.
  }
};

export const readSelectionState = (): MvpSelectionState => {
  const rawValue = readStorageValue();

  if (!rawValue) {
    return defaultSelectionState;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return defaultSelectionState;
    }

    return normalizeSelection(parsed);
  } catch {
    return defaultSelectionState;
  }
};

export const saveSelectionState = (selection: Partial<MvpSelectionState>) => {
  const normalizedSelection = normalizeSelection(selection);
  writeStorageValue(JSON.stringify(normalizedSelection));
};
