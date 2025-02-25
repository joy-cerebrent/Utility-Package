export type AllowedFileType = "image" | "video" | "audio" | "pdf" | "doc" | "ppt" | "any";

export type FileUploaderProps = {
  maxFiles?: number;
  maxSize?: number;
  allowedFiles?: AllowedFileType[];
  onUpload: (files: File[]) => Promise<void>;
  containerClassName?: string;
  previewClassName?: string;
  dropZoneClassName?: string;
  dropZoneLabelClassName?: string;
  errorClassName?: string;
  fileContainerClassName?: string;
  fileItemClassName?: string;
  uploadButtonClassName?: string;
  loadingClassName?: string;
  deleteButtonClassName?: string;
  closePreviewButtonClassName?: string;
}
