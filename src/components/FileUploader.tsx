import React, { useState, DragEvent } from "react";
import { twMerge } from "tailwind-merge";

import { UploadIcon, DeleteIcon, XIcon } from "./icons";
import { handleFiles, renderFile, getFilePreview } from "../utils";
import { FileUploaderProps } from "../types/FileUploader.types";

import "../styles/index.css";

const prioritizeTailwind = (className: string) => className.split(" ").map(word => `!${word}`).join(" ");

export const FileUploader = ({
  maxFiles = 5,
  maxSize = 4,
  allowedFiles = ["any"],
  onUpload,
  containerClassName,
  previewClassName,
  dropZoneClassName,
  dropZoneLabelClassName,
  errorClassName,
  fileContainerClassName,
  fileItemClassName,
  uploadButtonClassName,
  loadingClassName,
  deleteButtonClassName,
  closePreviewButtonClassName,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleFiles(e.dataTransfer.files, setFiles, files, maxFiles, maxSize, allowedFiles, setError);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files, setFiles, files, maxFiles, maxSize, allowedFiles, setError);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreview = (file: File) => {
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl);
    }
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewFileUrl(newPreviewUrl);
    setPreviewFile(file);
  };

  const closePreview = () => {
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl);
    }
    setPreviewFileUrl(null);
    setPreviewFile(null);
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError("No files to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    if (onUpload) {
      try {
        await onUpload(files);
      } catch (err) {
        setError("Failed to upload files.");
      }
    }

    setIsUploading(false);
  };

  return (
    <div
      className={containerClassName}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={twMerge("dropzone", dropZoneClassName)}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          style={{ display: "none" }}
          id="fileInput"
          aria-label="File Upload"
        />
        <label htmlFor="fileInput" className={dropZoneLabelClassName || "dropzone-label"}>
          <UploadIcon />
          <p>
            {isDraggingOver
              ? "Drop files here"
              : "Drag and drop files here, or click to select files"}
          </p>
          <p>
            Up to {maxFiles} files, {maxSize} MB each
          </p>
        </label>
      </div>

      {error && (
        <div className={twMerge("error", errorClassName)}>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold ml-1 text-red-600">
            <XIcon />
          </button>
        </div>
      )}

      {files.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
          }}
          className={fileContainerClassName}
        >
          {files.map((file, index) => (
            <div
              key={index}
              className={twMerge("file-item", fileItemClassName)}
              onClick={() => handlePreview(file)}
            >
              {renderFile(file)}
              <button
                className={twMerge("delete-button", deleteButtonClassName)}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {previewFile && previewFileUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#00000099",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={closePreview}
        >
          <div className={twMerge("preview", previewClassName)}>
            <button
              onClick={closePreview}
              className={twMerge("close-preview-button", closePreviewButtonClassName)}
            >
              <XIcon />
            </button>
            {getFilePreview(previewFile)}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={uploadButtonClassName || "upload-button"}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>

          {isUploading && (
            <div className={twMerge("loading", loadingClassName)}>
              <div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
