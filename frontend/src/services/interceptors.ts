import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { sessionStorage } from 'src/storage';

const NO_RETRY_HEADER = 'x-no-retry';
const EXPIRED_SESSION_MESSAGE = 'Sessão expirou';

function handleSignOut() {
  sessionStorage.clean();
  document.location.reload();
}

function setTokenHeader(request: InternalAxiosRequestConfig<any>) {
  const token = sessionStorage.getToken();
  request.headers.Authorization = token;
}

export async function onRequest(request: InternalAxiosRequestConfig<any>) {
  if (request.headers) {
    setTokenHeader(request);
  }

  return request;
}

export async function onResponseError(error: any) {
  if (error?.response?.status === 401) {
    const previousRequest = error.config;

    if (previousRequest.headers[NO_RETRY_HEADER]) {
      return Promise.reject(error);
    }

    setTimeout(handleSignOut, 1000);
    error.response.data.errors.message = EXPIRED_SESSION_MESSAGE;

    return Promise.reject(error);
  }

  return Promise.reject(error);
}

export const setupInterceptors = (
  axiosInstance: AxiosInstance,
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, (error) =>
    Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => onResponseError(error),
  );

  return axiosInstance;
};
