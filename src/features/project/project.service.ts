import logger from "../utils/logger";
import { ProjectCreate } from "./api";
import * as projectRepository from "./project.repository";
import { AppError } from "../../helpers/app-errors";
import { ProjectModel } from "./project.model";

export const create = async (project: ProjectCreate) => {
  const existingProject = await projectRepository.findProjectByName(
    project.name
  );

  if (existingProject) {
    logger.error(`project with this name exists!`);
    return AppError.badRequest("project with this name exists!");
  }

  const result = await projectRepository.createProject(project);

  return result;
};

export const update = async (project: ProjectModel) => {
  try {
    await projectRepository.updateProject(project);
    return { status: 200, message: { data: "Project updated!" } };
  } catch (error) {
    logger.error(error.toString());
    return AppError.serverError(error.toString());
  }
};
