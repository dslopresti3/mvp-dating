export const formatEventDate = (date: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(`${date}T00:00:00`));

export const formatEventDateLong = (date: string) =>
  formatEventDate(date, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const formatKebabLabel = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatSnakeLabel = (value: string) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
