import logger from "../utils/logger";
import { ProjectCreate } from "./api";
import * as projectRepository from "./project.repository";

export const create = async (project: ProjectCreate) => {
  const existingProject = await projectRepository.findProjectByName(
    project.name
  );

  if (existingProject) {
    logger.error(`project with this name exists!`);

    return {
      status: 404,
      message: { error: "project with this name exists!" },
    };
  }

  const result = await projectRepository.createProject(project);

  return result;
};
