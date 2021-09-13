import SimpleSchema from "simpl-schema";
Groups = new Mongo.Collection("groups");

GroupSchema = new SimpleSchema({
  name: String,
  description: {
    type: String,
    optional: true,
  },
});

Groups.attachSchema(GroupSchema);
