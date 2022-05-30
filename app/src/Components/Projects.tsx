import React, { useEffect, useState } from "react";
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
import moment from 'moment';

const Projects = () => {
  const [projects, setProjects] = useState<any>([]);
  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getproject();
      if (response) {
        setProjects(response?.data?.message);
      }
    };
    init();
  }, []);
  return (
    <TableContainer sx={{ minWidth: "100%", height: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>No of tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects &&
            projects.map((project: any, index: any) => (
              <TableRow key={project?._id}>
                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project?.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                   
                    {moment(project?.createdAt).format('DD-MM-YYYY,h:mm a')}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project?.tasks?.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Projects;
