/* eslint-disable import/prefer-default-export */

export function getFileNameFromHeaders(headers: any) {
  const contentDisposition = headers['content-disposition'];
  // const uriEncodedFileName = contentDisposition
  //   ? contentDisposition.slice(contentDisposition.lastIndexOf("'") + 1)
  //   : undefined;
  const uriEncodedFileName = contentDisposition?.match(/filename\*=UTF-8''([^;]+)?/)?.[1];
  return decodeURI(uriEncodedFileName);
}
