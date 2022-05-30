import React, { useEffect, useState } from 'react'
import * as Api from "../API";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Tooltip,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";

const Employee = () => {
 const [employess,setEmployess] = useState<any>([]);

 useEffect(() => {
  const init = async () => {
    const [error, response] = await Api.getUsers();
    if (response) {
      setEmployess(response?.data?.users);
    }
  };
  init();
 }, [])
 
 
  return (
    <>
      <TableContainer sx={{ minWidth: "100%", height: 500 }}>
      <Table>
      <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employess && employess.map((employee: any, index: any) => (
              <TableRow key={employee?._id}>
                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {employee?.Name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {employee?.Email_id}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {employee?.Role}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      </TableContainer>
    </>
  )
}

export default Employee