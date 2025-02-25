import { JspreadsheetInstance } from "jspreadsheet-ce";
import { TableColumnType } from "../types/Spreadsheet.types";
import { validateCell } from "./validateCell";

export const validateAllCellsOnLoad = (
  tableColumns: TableColumnType[],
  instance: JspreadsheetInstance
) => {
  const data = instance.getData();
  data.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const cell = instance.getCellFromCoords(colIndex, rowIndex);
      if (cell) {
        validateCell(tableColumns, instance, cell, colIndex, cellValue);
      }
    });
  });
};