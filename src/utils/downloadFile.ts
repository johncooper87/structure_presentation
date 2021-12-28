const downloader = document.createElement('a');

function downloadFile(blob: Blob, filename?: string) {
  const url = URL.createObjectURL(blob);
  downloader.href = url;
  downloader.setAttribute('download', filename);
  downloader.click();
  URL.revokeObjectURL(url);
}

export default downloadFile;
