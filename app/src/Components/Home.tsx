import { Card, Tab, Tabs, Box, Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import Projects from "./Projects";
import Tasks from "./Tasks";
import * as Api from "../API";
import AddTask from "./AddTask";

const Home = () => {
  const [currentTab, setCurrentTab] = useState("Employees");
  const [managerTab, setManagerTab] = useState("Projects");
  const [developerTab, setDeveloperTab] = useState("Tasks");

  const [projectId, setProjectId] = useState<any>();
  const [addTaskModel, setAddTaskModel] = useState(false);

  const handleOpenTaskModel = () => {
    setAddTaskModel(true);
  };

  const handleCloseTaskModel = () => {
    setAddTaskModel(false);
  };

  let userRole: any = localStorage.getItem("UserRole");

  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getproject();
      let projectId: any = response?.data?.message.map(
        (project: any) => project._id
      );
      console.log(projectId);
      if (projectId) {
        setProjectId(projectId[0]);
      }
    };
    init();
  }, []);

  const Admin_Tab = [
    {
      value: "Employees",
      component: <Employee />,
    },

    {
      value: "Projects",
      component: <Projects />,
    },
    {
      value: "Tasks",
      component: <Tasks />,
    },
  ];

  const Manager_Tab = [
    {
      value: "Projects",
      component: <Projects />,
    },
    {
      value: "Tasks",
      component: <Tasks />,
    },
  ];

  const Developer_Tab = [
    {
      value: "Tasks",
      component: <Tasks />,
    },
  ];

  return (
    <Grid container alignItems="center" direction="column">
      <Card
        sx={{
          p: 3,
          mt: 5,
          boxShadow: 5,
          height: "80vh",
          width: "70%",
          border: "1px solid white",
          borderRadius: "1%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "gray", textAlign: "center", fontFamily: "monospace" }}
        >
          Task Manager
        </Typography>

        {userRole === "admin" || userRole === "manager" ? (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleOpenTaskModel}>
              Add a new task
            </Button>
          </Box>
        ) : (
          <></>
        )}

        {userRole === "admin" ? (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
            >
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setCurrentTab(value)}
              >
                {Admin_Tab.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={tab.value}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>

            {Admin_Tab.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </>
        ) : (
          <></>
        )}

        {userRole === "manager" ? (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
            >
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setManagerTab(value)}
              >
                {Manager_Tab.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={tab.value}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>

            {Manager_Tab.map((tab) => {
              const isMatched = tab.value === managerTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </>
        ) : (
          <></>
        )}

        {userRole === "developer" ? (
            <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
            >
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setDeveloperTab(value)}
              >
                {Developer_Tab.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={tab.value}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>

            {Manager_Tab.map((tab) => {
              const isMatched = tab.value === developerTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
            </>
        ):(
          <></>
        )}

        <AddTask
          open={addTaskModel}
          onClose={handleCloseTaskModel}
          projectId={projectId}
        />
      </Card>
    </Grid>
  );
};

export default Home;
