import SimpleSchema from "simpl-schema";
Students = new Mongo.Collection("students");

StudentSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  number: SimpleSchema.Integer,
  groupId: SimpleSchema.RegEx.Id,
  status: {
    type: Boolean,
    optional: true,
  },
});

Students.attachSchema(StudentSchema);
