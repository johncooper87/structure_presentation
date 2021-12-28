export * from './menu';
export * from './dialog';
export * from './device';
export * from './client';
export * from './query';

export { default as getEmptyPageResult } from './getEmptyPageResult';
export { default as http } from './http';
export { default as notify } from './notify';
export { default as QueryFields } from './QueryFields';
export { default as classes } from './classes';
export { default as plural } from './plural';
export { default as lazy } from './lazy';
export { default as routeForward } from './routeForward';
export { default as formatDuration } from './formatDuration';
export { default as downloadFile } from './downloadFile';
export { default as createCSV } from './createCSV';
export { default as isMobile } from './isMobile';

export const nullPageResult = {
  pageNumber: undefined,
  pageSize: undefined,
  totalPages: undefined,
  totalRecords: undefined,
  data: undefined,
};
