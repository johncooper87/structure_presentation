type FileInputCallback = (files: File[]) => void;

let currentCallback: FileInputCallback | undefined;

function handleFileInputCallback(input: HTMLInputElement) {
  const files = Array.from(input.files || []);
  currentCallback?.(files);
  input.value = '';
}

interface FileDialogOptions {
  multiple?: boolean;
  accept?: string[];
}

const fileDialog = document.createElement('input');
fileDialog.type = 'file';
fileDialog.multiple = true;
fileDialog.accept = 'image/png, image/jpeg, application/pdf, application/docx';
fileDialog.addEventListener('change', () => handleFileInputCallback(fileDialog));
export function openFileDialog(callback: FileInputCallback, options?: FileDialogOptions) {
  currentCallback = callback;
  const { multiple = false, accept = ['*'] } = options || {};
  Object.assign(fileDialog, {
    multiple,
    accept: accept.join(', '),
  });
  fileDialog.click();
}

const camera = document.createElement('input');
camera.type = 'file';
// @ts-ignore
camera.capture = true;
camera.accept = 'image/*';
camera.addEventListener('change', () => handleFileInputCallback(camera));
export function openCamera(callback: FileInputCallback) {
  currentCallback = callback;
  camera.click();
}
