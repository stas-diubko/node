import logger from "../utils/logger";
import { ProjectCreate } from "./api";
import * as projectRepository from "./project.repository";
import { AppError } from "../../helpers/app-errors";

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
