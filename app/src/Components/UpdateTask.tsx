import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as Api from "../API";


const TASK_STATUS = [
  {
    id: "1",
    value: "completed",
    label: "Completed",
  },
  {
    id: "2",
    value: "workingOn",
    label: "Working On It",
  },
  {
    id: "3",
    value: "notCompleted",
    label: "Not Completed",
  },
];

const UpdateTask = (props: any) => {
  console.log(props?.Task);
  const [taskStatus,setTaskStatus] = useState('');
  let userRole: any = localStorage.getItem("UserRole");

  const onChangeStatus = (event: any, values: any) => {
    setTaskStatus(values?.value);
  };
  const updateTask = async () => {
    let task_status = taskStatus;
    let task_id = props.Task._id;
    const [error, response] = await Api.updateTask(task_id,task_status);
    console.log(response)
    if(!error){
        props?.onClose()
    }
  };
  return (
    <>
      <Dialog open={props.open} fullWidth maxWidth="xs" onClose={props.onClose}>
        <DialogTitle>
          <Typography variant="h4" sx={{ color: "gray" }}>
            Update a task
          </Typography>
        </DialogTitle>

        <Box sx={{ p: 3 }}>
          <Autocomplete
            id="tags-outlined"
            onChange={onChangeStatus}
            options={TASK_STATUS}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                type="tel"
                {...params}
                label="Task Status"
                placeholder="Status"
              />
            )}
          />

          {userRole === "admin" || userRole === "manager" ?(
          <></>
          ):(
            <></>
          )}
        </Box>

        <DialogActions>
          <Button variant="outlined" onClick={updateTask}>Update</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTask;
