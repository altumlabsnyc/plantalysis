import {
  Button,
  ClickAwayListener,
  CssBaseline,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useCallback } from "react";
import {
  CellProps,
  FilterProps,
  FilterValue,
  IdType,
  Row,
  TableInstance,
} from "react-table";
import { Popover, Typography } from "@material-ui/core";

import { Page } from "./regulator/Page";
import { Table } from "./regulator/Table";
import {
  PersonData,
  makeData,
  MoleculePrediction,
  makeMoleculePredictionData,
} from "./regulator/utils";
import { MoleculePredict } from "../UserTypes";

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
function roundedMedian(values: any[]) {
  let min = values[0] || "";
  let max = values[0] || "";

  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== "number";

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const options = React.useMemo(() => {
    const options = new Set<any>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);

  return (
    <TextField
      select
      label={render("Header")}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value={""}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

const getMinMax = (rows: Row<PersonData>[], id: IdType<PersonData>) => {
  let min = rows.length ? rows[0].values[id] : 0;
  let max = rows.length ? rows[0].values[id] : 0;
  rows.forEach((row) => {
    min = Math.min(row.values[id], min);
    max = Math.max(row.values[id], max);
  });
  return [min, max];
};

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(
    () => getMinMax(preFilteredRows, id),
    [id, preFilteredRows]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <TextField
        name={id}
        label={render("Header")}
        type="range"
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <Button
        variant="outlined"
        style={{ width: 60, height: 36 }}
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button>
    </div>
  );
}

const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  React.useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return active;
};

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(
    () => getMinMax(preFilteredRows, id),
    [id, preFilteredRows]
  );
  const focusedElement = useActiveElement();
  const hasFocus =
    focusedElement &&
    (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`);
  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render("Header")}
      </InputLabel>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: 5,
        }}
      >
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [
              val ? parseInt(val, 10) : undefined,
              old[1],
            ]);
          }}
          placeholder={`Min (${min})`}
          style={{
            width: "70px",
            marginRight: "0.5rem",
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [
              old[0],
              val ? parseInt(val, 10) : undefined,
            ]);
          }}
          placeholder={`Max (${max})`}
          style={{
            width: "70px",
            marginLeft: "0.5rem",
          }}
        />
      </div>
    </>
  );
}

const moleculePredictionColumns = [
  {
    Header: "Molecule ID",
    accessor: "moleculeId",
  },
  {
    Header: "Concentration",
    accessor: "concentration",
  },
];

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        aggregate: "count",
        Aggregated: ({ cell: { value } }: CellProps<PersonData>) =>
          `${value} Names`,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        aggregate: "uniqueCount",
        filter: "fuzzyText",
        Aggregated: ({ cell: { value } }: CellProps<PersonData>) =>
          `${value} Unique Names`,
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        minWidth: 50,
        align: "right",
        Filter: SliderColumnFilter,
        filter: "equals",
        aggregate: "average",
        disableGroupBy: true,
        defaultCanSort: false,
        disableSortBy: false,
        Aggregated: ({ cell: { value } }: CellProps<PersonData>) =>
          `${value} (avg)`,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        minWidth: 50,
        align: "right",
        Filter: NumberRangeColumnFilter,
        filter: "between",
        aggregate: "sum",
        Aggregated: ({ cell: { value } }: CellProps<PersonData>) =>
          `${value} (total)`,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: roundedMedian,
        Aggregated: ({ cell: { value } }: CellProps<PersonData>) =>
          `${value} (med)`,
      },
    ],
  },
]; //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const Regulator: React.FC = () => {
  const [data] = React.useState<PersonData[]>(() => makeData(100));
  const [moleculePredictionData] = React.useState<MoleculePrediction[]>(() =>
    makeMoleculePredictionData(3)
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    console.log('onclose')
    // setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  console.log(open)


  return (
    <Page>
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Table<MoleculePrediction>
            name={"testTable"}
            columns={moleculePredictionColumns}
            data={moleculePredictionData}
            hideToolBar={true}
            disableSelection={true}
            disablePagination={true}
            disableGroupBy={true}
          />
        </Popover>
        </div>
      </ClickAwayListener>
      <CssBaseline />
      <Table<PersonData>
        name={"testTable"}
        columns={columns}
        data={data}
        // rowProps={row => ({
        //   onClick: () => console.log('aaaa'),
        // })}
        onClick={(e, row) => {
          if (e && e.currentTarget && e.currentTarget.parentElement) {
            e.currentTarget = e.currentTarget.parentElement;
          }
          handleClick(e, row);
        }}
        enableDebug={true}
      />
    </Page>
  );
};

export default Regulator;
