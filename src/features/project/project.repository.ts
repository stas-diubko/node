import Project from "./project.model";
import { ProjectCreate } from "./api";


export const createProject = async (project: ProjectCreate) => {
  try {
    let newProject = await Project.create(project);
    return newProject;
  } catch (error) {
    return { status: 400, message: { error } };
  }
};

export const findProjectByName = async (name: string) => {
  try {
    const existingProject = await Project.findOne({
      name,
    });
    return existingProject;
  } catch (error) {
    return { status: 400, message: { error } };
  }
};
