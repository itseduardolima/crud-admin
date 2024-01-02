import styled from "styled-components";
import {
  Table,
  TableRow,
  TableCell,
  Button,
  TableContainer,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled(Table)`
  width: 100%;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
`;

export const StyledButton = styled(Button)`
  margin-right: 8px;
  background-color: #4caf50;
  color: #fff;
  padding: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const StyledDeleteButton = styled(Button)`
  color: #fff;
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;
