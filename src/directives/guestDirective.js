// sample schema directive to only allow guests
import {
  SchemaDirectiveVisitor,
  AuthenticationError
} from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const [, , context] = args;
      if (!context) {
        return await resolve.apply(this, args);
      } else {
        throw new AuthenticationError("You don't need to login.");
      }
    };
  }
}

export default GuestDirective;
