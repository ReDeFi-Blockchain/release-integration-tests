export class Retry {
  private static _defaultTimeout = 15000;
  private static _defaultInterval = 300;

  private static delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  private static timeoutReached(startTime: Date, timeout: number): boolean {
    return Date.now() - Number(startTime) > timeout;
  }

  static async until<T>(
    retryFunc: () => Promise<T> | T,
    checkFunc: (result: T) => Promise<boolean> | boolean,
    timeout: number = this._defaultTimeout,
    interval: number = this._defaultInterval,
    throwOnTimeout = true,
  ): Promise<T> {
    const startTime = new Date(Date.now());
    let lastValue: T | undefined = undefined;
    let lastError: Error | undefined = undefined;

    do {
      try {
        lastValue = await retryFunc();
        const success = await checkFunc(lastValue);
        if (success) {
          return lastValue;
        }
      } catch (error) {
        if (error instanceof Error) lastError = error;
        else lastError = Error("Unknown error");
      }
      await this.delay(interval);
    } while (!this.timeoutReached(startTime, timeout));

    if (throwOnTimeout) {
      lastError = lastError ?? new Error("Retry timeout reached");
      throw lastError;
    }
    if (!lastValue) throw Error("lastValue is undefined");
    return lastValue;
  }

  static whileError<T>(
    retryFunc: () => Promise<T> | T,
    timeout?: number,
    interval?: number,
  ) {
    return this.until(
      retryFunc,
      () => Promise.resolve(true),
      timeout,
      interval,
      true,
    );
  }
}
