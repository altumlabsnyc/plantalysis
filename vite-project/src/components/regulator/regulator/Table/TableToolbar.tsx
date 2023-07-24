import {
  Add,
  Create,
  DeleteOutline,
  FilterList,
  ViewColumn,
} from "@mui/icons-material"
import {
  Button,
  IconButton,
  Theme,
  Toolbar,
  Tooltip,
} from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import classnames from "classnames"
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from "react"
import { TableInstance } from "react-table"

import { ColumnHidePage } from "./ColumnHidePage"
import { FilterPage } from "./FilterPage"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    leftButtons: {},
    rightButtons: {},
    leftIcons: {
      "&:first-of-type": {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 12,
      marginTop: "-6px",
      width: 48,
      height: 48,
      "&:last-of-type": {
        marginRight: -12,
      },
    },
  })
)

type InstanceActionButton<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  icon?: JSX.Element
  // @ts-ignore
  onClick: TableMouseEventHandler
  enabled?: (instance: TableInstance<T>) => boolean
  label: string
  variant?: "right" | "left"
}

type ActionButton = {
  icon?: JSX.Element
  onClick: MouseEventHandler
  enabled?: boolean
  label: string
  variant?: "right" | "left"
}

export const InstanceLabeledActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick(instance)}
    disabled={!enabled(instance)}
  >
    {icon}
    {label}
  </Button>
)

export const LabeledActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton): ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={!enabled}
  >
    {icon}
    {label}
  </Button>
)

export const InstanceSmallIconActionButton = <
  T extends Record<string, unknown>
>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>): ReactElement => {
  const classes = useStyles({})
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === "right",
            [classes.leftIcons]: variant === "left",
          })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton): ReactElement => {
  const classes = useStyles({})
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === "right",
            [classes.leftIcons]: variant === "left",
          })}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  // @ts-ignore
  onAdd?: TableMouseEventHandler
  // @ts-ignore
  onDelete?: TableMouseEventHandler
  // @ts-ignore
  onEdit?: TableMouseEventHandler
  // @ts-ignore
  onClaim?: TableMouseEventHandler
  // @ts-ignore
  onApprove?: TableMouseEventHandler
  onSelectionChange?: () => void
}

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
  onAdd,
  onDelete,
  onEdit,
  onClaim,
  onApprove,
  onSelectionChange,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { columns } = instance
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const hideableColumns = columns.filter(
    (column) => !(column.id === "_selector")
  )

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setColumnsOpen(true)
    },
    [setAnchorEl, setColumnsOpen]
  )

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setFilterOpen(true)
    },
    [setAnchorEl, setFilterOpen]
  )

  const handleClose = useCallback(() => {
    setColumnsOpen(false)
    setFilterOpen(false)
    setAnchorEl(undefined)
  }, [])

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.leftButtons}>
        {onAdd && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<Add />}
            onClick={onAdd}
            label="Add"
            enabled={({ state }: TableInstance<T>) =>
              !state.selectedRowIds ||
              Object.keys(state.selectedRowIds).length === 0
            }
            variant="left"
          />
        )}
        {onEdit && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<Create />}
            onClick={onEdit}
            label="Edit"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length === 1
            }
            variant="left"
          />
        )}
        {onDelete && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<DeleteOutline />}
            onClick={onDelete}
            label="Delete"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length > 0
            }
            variant="left"
          />
        )}

        {[
          {
            fn: onClaim,
            text: "Claim",
          },
          {
            fn: onApprove,
            text: "Approve",
          },
        ].map(
          ({ fn, text }) =>
            fn && (
              <Button
                onClick={fn}
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#CFAA41",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CFAA41", // Maintain the same background color on hover
                  },
                }}
              >
                {text}
              </Button>
            )
        )}

        {onSelectionChange && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            onClick={onSelectionChange}
            label={""}
            enabled={() => true}
            variant="left"
          />
        )}
      </div>
      <div className={classes.rightButtons}>
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />
        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />
        {hideableColumns.length > 1 && (
          <SmallIconActionButton
            icon={<ViewColumn />}
            onClick={handleColumnsClick}
            label="Show / hide columns"
            variant="right"
          />
        )}
        <SmallIconActionButton
          icon={<FilterList />}
          onClick={handleFilterClick}
          label="Filter by columns"
          variant="right"
        />
      </div>
    </Toolbar>
  )
}