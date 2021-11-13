export type FormError<T> = {
  [P in keyof T]?: string;
} & { error?: string };
