import styled from "styled-components";
import {
  Table,
  TableRow,
  TableCell,
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

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Info = styled.div`
  display: flex;
  gap: 100px;

  @media (max-width: 450px) {
    gap: 10px;
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    display: flex;
    gap: 5px;
    align-items: center;
    font-family: sans-serif;
    font-size: 0.9rem;
    margin-bottom: 10px;

    @media (max-width: 450px) {
      font-size: 0.7rem;
    }
  }
`;

export const TitleModal = styled.h2`
  padding-bottom: 5px;
  border-bottom: 2px solid black;
  width: 300px;
  padding: 20px;
  font-family: sans-serif;
`;
