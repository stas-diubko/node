import Project from "./project.model";
import { ProjectCreate } from "./api";
import logger from "../utils/logger";
import { AppError } from "../../helpers/app-errors";

export const createProject = async (project: ProjectCreate) => {
  try {
    await Project.create(project);
    return { status: 200, message: { data: "Project created!" } };
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return AppError.serverError(error.toString());
  }
};

export const findProjectByName = async (name: string) => {
  try {
    return await Project.findOne({
      name,
    });
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return AppError.serverError(error.toString());
  }
};
