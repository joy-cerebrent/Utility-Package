import jspreadsheet, { ToolbarItem } from "jspreadsheet-ce";
import { SpreadSheetProps } from "../types/Spreadsheet.types";

export const generateToolbar = (
  spreadsheetInstance: jspreadsheet.JspreadsheetInstance | null,
  toolbarOptions: SpreadSheetProps['toolbarOptions']
): ToolbarItem[] | undefined => {
  return [
    ...(toolbarOptions?.undo ? [{
      id: "undo",
      type: "i" as const,
      content: 'undo',
      onclick: () => spreadsheetInstance?.undo(),
    }] : []),
    ...(toolbarOptions?.redo ? [{
      id: "redo",
      type: 'i' as const,
      content: 'redo',
      onclick: () => spreadsheetInstance?.redo(),
    }] : []),
    ...(toolbarOptions?.save ? [{
      id: "save",
      type: 'i' as const,
      content: 'save',
      onclick: () => spreadsheetInstance?.download(),
    }] : []),
    ...(toolbarOptions?.fontFamily ? [{
      type: 'select' as const,
      k: 'font-family',
      v: ['Arial', 'Verdana'],
    }] : []),
    ...(toolbarOptions?.fontSize ? [{
      type: 'select' as const,
      k: 'font-size',
      v: ['9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px'],
    }] : []),
    ...(toolbarOptions?.textAlign ? [
      {
        id: "text-align-left",
        type: 'i' as const,
        content: 'format_align_left',
        k: 'text-align',
        v: 'left',
      },
      {
        id: "text-align-center",
        type: 'i' as const,
        content: 'format_align_center',
        k: 'text-align',
        v: 'center',
      },
      {
        id: "text-align-right",
        type: 'i' as const,
        content: 'format_align_right',
        k: 'text-align',
        v: 'right',
      }
    ] : []),
    ...(toolbarOptions?.fontBold ? [{
      id: "font-bold",
      type: 'i' as const,
      content: 'format_bold',
      k: 'font-weight',
      v: 'bold',
    }] : []),
    ...(toolbarOptions?.color ? [{
      type: 'color' as const,
      content: 'format_color_text',
      k: 'color',
    }] : []),
    ...(toolbarOptions?.backgroundColor ? [{
      type: 'color' as const,
      content: 'format_color_fill',
      k: 'background-color',
    }] : []),
  ];
};