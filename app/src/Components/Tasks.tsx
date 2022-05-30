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
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import UpdateTask from "./UpdateTask";

const Tasks = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [TASK,setTASK] = useState<any>();

  const [updateTaskModel, setUpdateTaskModel] = useState(false);

  const handleOpenUpdateModel = () => {
    setUpdateTaskModel(true);
  };

  const handleCloseUpdateModel = () => {
    setUpdateTaskModel(false);
  };

  let userRole: any = localStorage.getItem("UserRole");
  let userName: any = localStorage.getItem("UserName");

  const getTask = (task:any) =>{
      setTASK(task);
      handleOpenUpdateModel()
  }

  
  
  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getTasks();
      if (response) {
        setTasks(response?.data?.tasks);
      }
    };
    init();
  }, []);

  return (
    <>
      <TableContainer sx={{ minWidth: "100%", height: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              {userRole === "admin" || userRole === "manager" ? (
                <TableCell>Assigned To</TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>

          {userRole === "admin" || userRole === "manager" ? (
            <TableBody>
              {tasks &&
                tasks.map((task: any, index: any) => (
                  <TableRow key={task?._id}>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {task?.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {moment(task?.createdAt).format('DD-MM-YYYY,h:mm a')}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {task?.status}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {task?.assignedTo}
                      </Typography>
                    </TableCell>

                    <TableCell>
                <Button variant="text" onClick={() =>getTask(task)}>
                  <EditIcon />
                </Button>
                </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <></>
          )}

          {tasks
            .filter((obj: any) => obj.assignedTo === userName)
            .map((task: any) => (
              <TableRow key={task?._id}>
                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {task?.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {task?.createdAt}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {task?.status}
                  </Typography>
                </TableCell>

                <TableCell>
                <Button variant="text" onClick={() =>getTask(task)}>
                  <EditIcon />
                </Button>
                </TableCell>


              </TableRow>
            ))}
        </Table>
        <UpdateTask
        open={updateTaskModel}
        onClose={handleCloseUpdateModel}
        Task={TASK}
        />
      </TableContainer>
    </>
  );
};

export default Tasks;
