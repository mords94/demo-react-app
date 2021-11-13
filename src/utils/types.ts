export const isUndefined = (value: any): value is undefined =>
  typeof value === 'undefined';

export const isNull = (value: any): value is null => value === null;

export const isNullOrUndefined = (value: any): value is null | undefined =>
  isNull(value) || isUndefined(value);

export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isEmpty = (value: string, shouldTrim = false): boolean => {
  return shouldTrim ? !value.trim().length : !value.length;
};

export const isNumber = (value: any): value is number => !isNaN(value);

export const isObject = (value: any): value is object =>
  typeof value === 'object' && !isNull(value);

export type NullOr<T> = T | null;
export type UndefinedOr<T> = T | undefined;
export type OptionalValue<T> = T | UndefinedOr<T> | NullOr<T>;

class OptionalClass<T> {
  private value: OptionalValue<T>;

  constructor(value: OptionalValue<T>) {
    this.value = value;
  }

  public hasValue(value: OptionalValue<T>): value is T {
    return !isNullOrUndefined(value);
  }

  public isPresent(): this is T {
    return this.hasValue(this.value);
  }

  public getOr(or: T): T {
    return this.value ?? or;
  }

  public get(): T {
    if (!this.hasValue(this.value)) {
      throw new Error('Unable to get null or undefined value');
    }

    return this.value;
  }
}

const Optional = <T>(value: OptionalValue<T>) => new OptionalClass<T>(value);

Optional.empty = <T = any>(): OptionalClass<T> => new OptionalClass<T>(null);

export { Optional, OptionalClass };
