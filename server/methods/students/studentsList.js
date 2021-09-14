import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "students.list",
  validate: new SimpleSchema({
    options: {
      type: QueryOptionsSchema,
      optional: true,
    },
  }).validator(),
  run: function (data) {
    this.unblock();

    const { options } = data;
    console.log(data);
    return Fetch(Students, {}, options, "students");
  },
});
