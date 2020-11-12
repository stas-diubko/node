import Project from "./project.model";
import { ProjectCreate } from "./api";

export const createProject = async (project: ProjectCreate) => {
  try {
    return await Project.create(project);
  } catch (error) {
    return { status: 400, message: { error } };
  }
};

export const findProjectByName = async (name: string) => {
  try {
    return await Project.findOne({
      name,
    });
  } catch (error) {
    return { status: 400, message: { error } };
  }
};
