import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSideBar from "./components/ProjectsSideBar.jsx";

function App() {
  const [projectState, setProjectState] = useState({

    selectedProjectId: undefined,
    projects: []

  });

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData) {// expected to get the project data here as parameter from the place where it is invoked
    setProjectState(prevState => {

      const projectId = Math.random();

      const newProject = {

        ...projectData,
        // id: Math.random()// enrich by adding an Id which will be importatnt for later to selecting a project
        // Id should be generated here so used math.random
        // so these newProject is added to below to this projects[]--> projects:[...prevState.projects,newProject] array
        id: projectId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  // console.log(projectState);

  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />
    //4/12/2023
    //*so now sethandleAddproject as a value to newly added onAdd prop on this NewProject Compinent

  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">

      <ProjectsSideBar onStartAddProject={handleStartAddProject}
        projects={projectState.projects} />
      {/* <NewProject/> */}
      {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
      {content}
    </main  >
  );
}

export default App;
