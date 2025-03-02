import React from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { generateCsv, mkConfig, download, ConfigOptions } from "export-to-csv";
import { Box, Button } from "@mui/material";
import { MRT_Localization_AR } from "material-react-table/locales/ar";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";

interface AppTableProps {
  exportConfig?: ConfigOptions;
  withExport?: boolean;
}

const Table = ({
  exportConfig,
  withExport = false,
  ...tableInstanceProps
}: MRT_TableOptions<any> & AppTableProps) => {
  const { t, i18n } = useTranslation();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    ...exportConfig,
  });

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const badTypes: string[] = ["function", "object"];
    const rowData = rows.map((row) => {
      const availableKeys = Object.keys(row.original).filter((key) => {
        return !badTypes.includes(`${typeof row.original[key]}`);
      });
      type ObjectToExport = {
        [key: string]: any;
      };
      const objectToExport: ObjectToExport = availableKeys.reduce(
        (pre, cur) => {
          return {
            ...pre,
            [cur]: row.original[cur],
          };
        },
        {}
      );
      return objectToExport;
    });
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  tableInstanceProps = {
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableColumnOrdering: false,
    enableSorting: false,
    muiTableContainerProps: {
      sx: {
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      },
    },
    enableHiding: false,
    localization:
      i18n.language === "ar" ? MRT_Localization_AR : MRT_Localization_EN,
    enableTopToolbar: withExport,
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
          >
            {t("table.exportCSV")}
          </Button>
        </Box>
      );
    },
    ...tableInstanceProps,
  };
  const table = useMaterialReactTable(tableInstanceProps);

  return (
    <Box dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Table;
