import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "attendances.createBulk",
  validate: new SimpleSchema({
    attendances: Array, //bir array tanımladık
    "attendances.$": AttendanceSchema, //Array'in içerisindeki her bir elemanın modeli(düzen belirliyır)
  }).validator(),
  run: function (data) {
    this.unblock();

    const { attendances } = data;

    attendances.forEach((attendance) => {
      Attendances.insert(attendance); //Attendences içerisindeki tüm verileri bu arraya insert ediyoruz
    });
  },
});
