export function delay(milliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(true), milliseconds),
  );
}

export async function retry<T>(
  promise: Promise<T>,
  milliseconds: number,
  retries: number,
): Promise<T> {
  try {
    const response = await promise;
    return response;
  } catch (error) {
    return delay(milliseconds).then(() => {
      if (retries > 1) {
        return retry(promise, milliseconds, retries - 1);
      }

      throw error;
    });
  }
}
