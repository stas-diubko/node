import { validate, ValidatorResult } from "jsonschema";

export const toValidate = (value: any, schema: any): ValidatorResult => {
    return validate(value, schema);
};
