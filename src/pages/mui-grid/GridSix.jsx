import * as React from "react";
import {
  DataGridPremium,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import GridFive_Three from "./GridFive_Three";
import gridFive from "./GridFiveData";

import "./GridSix.css";
import GridSix_One from "./GridSix_One";
import { renderEditRating } from "@mui/x-data-grid-generator";
import GridEight from "./GridEight";

export default function GridSix() {
  const apiRef = useGridApiRef();

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ["account" , "symbol"],
      },
      aggregation: {
        model: {
          quantity: "sum",
          filledQuantity: "sum",
          unrealizedPNL: "sum",
          realizedPNL: "sum",
          totalPNL: "sum",
          qtyBought: "sum",
          qtySold: "sum",
          qtyShorted: "sum",
        },
      },
    },
  });

  const getDetailPanelContent = React.useCallback(({row}) => {
    return <GridFive_Three row={row.innerData} />;
  }, []);

  /* const getDetailPanelContent = React.useCallback((params) => {
    console.log(params);

    return <GridFive_Three row={params.row.innerData} />;
  }, []);
 */
  /*   const getAggregationValue = React.useCallback(({ row }) => {
    console.log("row.__meta.isParentGroup");
    console.log(row.__meta.isParentGroup);
    if (row.__meta?.isParentGroup && row.__meta?.depth === 1) {
      return null; // Hide aggregation for the second row group
    }
    return row.__meta?.aggregates?.quantity; // Display aggregation value for other groups
  }, []); */

  // Custom render function for a specific column
  /* const renderCustomCell = React.useCallback(
    (params) => <div style={{ color: "red" }}>{params.value}</div>,
    []
  ); */

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGridPremium
        apiRef={apiRef}
        columns={gridFive.columns}
        rows={gridFive.rows}
        disableRowSelectionOnClick
        initialState={initialState}
        getAggregationPosition={(groupNode) =>
          groupNode.depth === -1 ? null : "inline"
        }
        getDetailPanelContent={getDetailPanelContent}
        /* slots={{
          footer : (params) => getDetailPanelContent(),
        }} */
        /*slotProps={{
          detailPanel: {
            row: {
              innerData: gridFive.rows[0], // Example row data, you can replace it with actual data
            },
          },
        }} */
      />
    </div>
  );
}
