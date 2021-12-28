import { store } from 'app';
import qs from 'query-string';
import { getFileNameFromHeaders } from './getFileNameFromHeaders';
import notify from './notify';

interface RequestOptions {
  onSuccess?: (response: Response) => void;
  onError?: (response: Response) => void;
  contentType?: 'JSON' | 'FormData';
}

async function _fetch(url: RequestInfo, init?: RequestInit, options?: RequestOptions) {
  const response = await fetch(url, init);
  switch (response.status) {
    case 200: {
      options?.onSuccess?.(response);
      break;
    }
    case 418: {
      const message = await response.text();
      notify.error(message);
      break;
    }
    case 401: {
      try {
        store?.dispatch({ type: 'SIGNOUT' });
      } catch (error) {
        //
      }
      break;
    }
    default: {
      options?.onError?.(response);
    }
  }
  return response;
}

async function getContent(response: Response) {
  if (!response.ok) return undefined;
  const contentType = response.headers.get('Content-Type');
  if (!contentType) return response;
  if (contentType.includes('json')) return response.json();
  if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = getFileNameFromHeaders({ 'content-disposition': contentDisposition });
    const blob = await response.blob();
    return new File([blob], filename);
  }
  return response;
}

async function get(url: string, query?: Record<string, any>, options?: RequestOptions) {
  const _url = qs.stringifyUrl({ url, query });
  const response = await _fetch(_url, {}, options);
  return getContent(response);
}

interface RequestInitParam {
  body: FormData | string;
  headers?: {
    'Content-Type'?: 'application/json';
  };
}

function getRequestInitParam(
  data: Record<string, any>,
  options?: RequestOptions
): RequestInitParam {
  if (data instanceof FormData) return { body: data };

  if (options?.contentType !== 'FormData') {
    if (data instanceof Object)
      return {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    return { body: data };
  }

  const formData = new FormData();
  for (const key in data) {
    let value = data[key];
    // eslint-disable-next-line no-continue
    if (value === undefined) continue;
    value = value instanceof Object && !(value instanceof File) ? JSON.stringify(value) : value;
    formData.append(key, value);
  }
  return {
    body: formData,
  };
}

async function post(url: string, data: Record<string, any> | FormData, options?: RequestOptions) {
  const { body, headers } = getRequestInitParam(data, options);
  const response = await _fetch(
    url,
    {
      method: 'POST',
      body,
      headers: {
        ...headers,
      },
    },
    options
  );
  return getContent(response);
}

async function put(url: string, data: Record<string, any>, options?: RequestOptions) {
  const { body, headers } = getRequestInitParam(data, options);
  const response = await _fetch(
    url,
    {
      method: 'PUT',
      body,
      headers: {
        ...headers,
      },
    },
    options
  );
  return getContent(response);
}

async function _delete(url: string, options?: RequestOptions) {
  const response = await _fetch(
    url,
    {
      method: 'DELETE',
    },
    options
  );
  return getContent(response);
}

const http = {
  get,
  post,
  put,
  delete: _delete,
};

export default http;
