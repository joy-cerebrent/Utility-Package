import { CellValue, JspreadsheetInstance, JspreadsheetInstanceElement } from "jspreadsheet-ce";
import { TableColumnType } from "../types/Spreadsheet.types";

export const validateCell = (
  tableColumns: TableColumnType[],
  _instance: JspreadsheetInstance | JspreadsheetInstanceElement,
  cell: HTMLTableCellElement,
  x: string | number,
  value: CellValue
) => {
  cell.style.backgroundColor = "";
  const column = tableColumns[x as number];

  if (column) {
    if (column.required && !value) {
      // alert(`Error: Value in column "${column.title}" is required`);
      cell.style.backgroundColor = "#FF000066";
      return false;
    }

    if (column.minlength && value.toString().length < column.minlength) {
      // alert(`Error: Value in column "${column.title}" is too short (minlength: ${column.minlength})`);
      cell.style.backgroundColor = "#FF000066";
      return false;
    }

    if (column.maxlength && value.toString().length > column.maxlength) {
      // alert(`Error: Value in column "${column.title}" exceeds maximum length (maxlength: ${column.maxlength})`);
      cell.style.backgroundColor = "#FF000066";
      return false;
    }

    if (column.regex && (column.regex instanceof RegExp) && value && !column.regex.test(value.toString())) {
      // alert(`Error: Invalid value in column "${column.title}"`);
      cell.style.backgroundColor = "#FF000066";
      return false;
    }

    if (x === 1 && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.toString())) {
        // alert("Invalid Email Error");
        cell.style.backgroundColor = "#FF000066";
        return false;
      }
    }

    return true;
  }
};