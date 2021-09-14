import SimpleSchema from "simpl-schema";
import moment from "moment";

new ValidatedMethod({
  name: "attendances.getByDate",
  validate: new SimpleSchema({
    startDate: Date, //tip tanımlaması ile buraya almı olduk
    options: {
      type: QueryOptionsSchema,
      optional: true,
    },
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options, startDate } = data;

    const start = moment(startDate).utc(0).startOf("day").toDate(); //sbir günü içiresindeki başlagıç tarhini almış olduk
    const end = moment(startDate).utc(0).endOf("day").toDate();
    console.log(start, end);

    return Fetch(
      Attendances,
      { date: { $gte: start, $lte: end } },
      options,
      "attendances"
    );
  },
});
