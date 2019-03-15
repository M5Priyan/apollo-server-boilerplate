export default {
  Query: {
    // default apollo resolver signature, check apollo docs for more info
    hello: (parent, args, context, info) => {
      return "Hello world";
    }
  },

  Mutation: {
    sayHiTo: async (parent, { name }, context, info) => {
      return `Hello ${name}`;
    }
  }
};
