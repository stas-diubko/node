import { Document } from "mongoose";

import { validate } from "../../helpers";
import logger from "../utils/logger";
import { ProjectCreate } from "./api";
import * as projectRepository from "./project.repository";
import * as featureRepository from "../feature/feature.repository";

import ProjectSchema from "./schemas/CreateProjectScema.json";
import { FeatureView } from "../feature/api";

export const create = async (project: ProjectCreate, feature: FeatureView) => {
  const validateObject = validate.toValidate(project, ProjectSchema);

  if (!validateObject.valid) {
    logger.error(
      `create project data is not valid, error: ${
        validateObject.errors
      }, user = ${JSON.stringify(project)}`
    );
    return { status: 400, message: { error: validateObject.errors } };
  }

  const existingProject = await projectRepository.findProjectByName(project.name);

  if (existingProject) {
    logger.error(`project with this name exists!`);
    return {
      status: 404,
      message: { error: "project with this name exists!" },
    };
  }

  const newProject: any = await projectRepository.createProject(project);
 
    feature.project = newProject._id ? newProject._id : ''
  
  const result = await featureRepository.createFeature(feature)

  return result;
};
