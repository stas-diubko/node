import Project from "./project.model";
import { ProjectCreate } from "./api";
import logger from "../utils/logger";

export const createProject = async (project: ProjectCreate) => {
  try {
    await Project.create(project);
    return { status: 200, message: { data: "Project created!" } };
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return { status: 500, message: { error } };
  }
};

export const findProjectByName = async (name: string) => {
  try {
    return await Project.findOne({
      name,
    });
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return { status: 500, message: { error } };
  }
};
