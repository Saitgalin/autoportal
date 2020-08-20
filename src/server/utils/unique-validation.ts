import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import {getManager} from "typeorm/index";

@ValidatorConstraint({async: true})
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const entity = validationArguments.object[`class_entity_${validationArguments.property}`]
    return getManager()
        .count(entity, {[validationArguments.property]: value})
        .then((count) => count < 1)
  }
}

export function UniqueOnDatabase(entity: Function, validationOptions?: ValidationOptions) {
  validationOptions = { ...{ message: '$value already exists. Choose another.' }, ...validationOptions };
  return function (object: Object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
