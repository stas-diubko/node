import { validate } from "../../helpers";
import logger from "../utils/logger";
import { ProjectCreate } from "./api";
import * as repository from "./project.repository";
import ProjectSchema from "./schemas/CreateProjectScema.json";

export const create = async (project: ProjectCreate) => {
  const validateObject = validate.toValidate(project, ProjectSchema);

  if (!validateObject.valid) {
    logger.error(
      `create project data is not valid, error: ${
        validateObject.errors
      }, user = ${JSON.stringify(project)}`
    );
    return { status: 400, message: { error: validateObject.errors } };
  }

  const existingProject = await repository.findProjectByName(project.name);

  if (existingProject) {
    logger.error(`project with this name exists!`);
    return {
      status: 404,
      message: { error: "project with this name exists!" },
    };
  }

  const result = await repository.createProject(project);
  return result;
};
