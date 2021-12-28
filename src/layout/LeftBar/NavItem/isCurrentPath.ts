const isCurrentPath = (locationPath: string, currentPath: string, exact = false) => {
  return exact
    ? locationPath === currentPath
    : locationPath.slice(0, currentPath.length) === currentPath;
};

export default isCurrentPath;
