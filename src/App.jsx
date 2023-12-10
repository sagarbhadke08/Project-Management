import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSideBar from "./components/ProjectsSideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [projectsState, setprojectsState] = useState({

    selectedProjectId: undefined,
    projects: [],
    tasks: [],

  });

  function handleAddTask(text) {
    setprojectsState((prevState) => {

      const taskId = Math.random();

      const newTask = {

        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {

    setprojectsState((prevState) => {
      return {
        ...prevState,
        // selectedProjectId: undefined, //* commented bcz it was re exe the component
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });

  }

  function handleStartAddProject() {

    setprojectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });

  }

  function handleSelectProject(id) {

    setprojectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });

  }

  function handleCancelAddProject() {

    setprojectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });

  }

  function handleAddProject(projectData) {// expected to get the project data here as parameter from the place where it is invoked

    setprojectsState((prevState) => {

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

  function handleDeleteProject() {

    setprojectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });

  }

  // console.log(projectsState);
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    < SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
    //4/12/2023
    //*so now sethandleAddproject as a value to newly added onAdd prop on this NewProject Compinent

  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">

      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {/* <NewProject/> */}
      {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
      {content}
    </main  >
  );
}

export default App;
