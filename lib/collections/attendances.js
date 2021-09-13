import SimpleSchema from "simpl-schema";
Attendances = new Mongo.Collection("attendances");

AttendanceSchema = new SimpleSchema({
  date: Date,
  studentId: SimpleSchema.RegEx.Id,
  groupId: SimpleSchema.RegEx.Id,
  status: {
    type: Boolean,
    optional: true,
  },
});

Attendances.attachSchema(AttendanceSchema);//valide etme işlemlerini gerçekleştirir
