import { AudioIcon } from "./AudioIcon";
import { BookIcon } from "./BookIcon";
import { DocIcon } from "./DocIcon";
import { FileBox } from "./FileBoxIcon";
import { PptIcon } from "./PptIcon";
import { VideoIcon } from "./VideoIcon";


type FileIconContainerProps = {
  fileName: string;
  type: "pdf" | "doc" | "ppt" | "video" | "audio" | "other";
};

const iconMap: Record<FileIconContainerProps["type"], React.ReactNode> = {
  video: <VideoIcon />,
  audio: <AudioIcon />,
  doc: <DocIcon />,
  ppt: <PptIcon />,
  pdf: <BookIcon />,
  other: <FileBox />,
};

export const FileIconContainer = ({
  fileName,
  type
}: FileIconContainerProps) => (
  <div
    className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg text-sm transition"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "6rem", // 24 * 0.25rem = 6rem
      height: "6rem", // 24 * 0.25rem = 6rem
      backgroundColor: "#fee2e2", // bg-red-100
      color: "#ef4444", // text-red-500
      borderRadius: "0.5rem", // rounded-lg (8px)
      fontSize: "0.875rem", // text-sm (14px)
      transition: "background-color 150ms ease-in-out", // transition
    }}
  >
    {iconMap[type]}
    <p
      className="mt-0.5 text-[0.6rem] leading-tight text-center"
      style={{
        marginTop: "0.125rem", // mt-0.5 (0.5 * 0.25rem = 0.125rem)
        fontSize: "0.6rem", // text-[0.6rem]
        lineHeight: "1.25", // leading-tight
        textAlign: "center", // text-center
      }}
    >
      {fileName}
    </p>
  </div>
);
