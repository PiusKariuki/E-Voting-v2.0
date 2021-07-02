import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

// icons for voted true/false
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {


  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, btns, clickHandler, ids} = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <React.Fragment key={key}>
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}>
                      {prop}
                    </TableCell>
                  </React.Fragment>
                );
              })}

              {/* action buttons */}
              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}>
                Actions
              </TableCell>

            </TableRow>
          </TableHead>
        ) : null}


        <TableBody>
          {/* use our create data method to populate our table */}
          {tableData.map((prop, row) => {
            return (
              <TableRow key={row} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    typeof (prop) !== "boolean" ? (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>)
                      // conditional for booleans
                      : (
                        <TableCell className={classes.tableCell} key={key}>
                          {prop === true ? <CheckOutlinedIcon /> : <CancelOutlinedIcon />}
                        </TableCell>
                      )
                  );
                })}
                {/* action buttons */}
                  <TableCell className={classes.tableCell}>
                      {btns && btns.map((btn,key) =>{ 
                        return(
                          <Button variant="contained" color="secondary" key={key}
                            className={classes.btn} name={btn} id={btn} size="small"
                          // passing in the first cell in the row as prop[0]
                            onClick={(btn) => clickHandler(btn,ids[row])}>{btn}</Button>
                        )
                      })}
                  </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
