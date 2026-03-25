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
  eventId: selection.eventId ?? defaultSelectionState.eventId,
  intent: selection.intent && isIntentValue(selection.intent) ? selection.intent : defaultSelectionState.intent,
  dateStyle:
    selection.dateStyle && isDateStyleValue(selection.dateStyle)
      ? selection.dateStyle
      : defaultSelectionState.dateStyle,
});

export const readSelectionState = (): MvpSelectionState => {
  if (typeof window === "undefined") {
    return defaultSelectionState;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return defaultSelectionState;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<MvpSelectionState>;
    return normalizeSelection(parsed);
  } catch {
    return defaultSelectionState;
  }
};

export const saveSelectionState = (selection: Partial<MvpSelectionState>) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedSelection = normalizeSelection(selection);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSelection));
};
