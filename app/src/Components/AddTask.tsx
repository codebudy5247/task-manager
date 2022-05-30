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
import React, { useEffect, useState } from "react";
import * as Api from "../API";

const AddTask = (props: any) => {
  const [developerList, setDeveloperList] = useState<any>();
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const onChangeTask = (e: any) => {
    setTaskName(e.target.value);
  };
  const onChangeAssignedTo = (event: any, values: any) => {
    setAssignedTo(values);
  };

  const addTask = async () => {
    let task_name = taskName;
    let assigned_to = assignedTo;
    let project_id = props.projectId;
    const [error, response] = await Api.createTask(
      task_name,
      project_id,
      assigned_to
    );
    if(!error){
        props?.onClose()
    }
  };

  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getUsers();
      const developerList: any = response?.data?.users
        ?.filter((user: any) => user.Role === "developer")
        .map((user: any) => user.Name);

      setDeveloperList(developerList);
    };
    init();
  }, []);

  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={props.onClose}>
      <DialogTitle>
        <Typography variant="h4" sx={{ color: "gray" }}>
          Add a new task
        </Typography>
      </DialogTitle>

      <Box sx={{ p: 3 }}>
        <TextField
          required={true}
          fullWidth
          id="name"
          label="Name of the task"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={onChangeTask}
        />

        <Autocomplete
          id="tags-outlined"
          onChange={onChangeAssignedTo}
          options={developerList}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              type="tel"
              {...params}
              label="Assigned To"
              placeholder="Assigned To"
            />
          )}
        />
      </Box>

      <DialogActions>
        <Button variant="outlined" onClick={addTask}>
          Add Task
        </Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
