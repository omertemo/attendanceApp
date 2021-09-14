import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesStudents.onCreated(function () {
  this.state = new ReactiveDict(null, {
    attendances: [],
    notFound: false,
    startDate: moment().toDate(), //js 'e çevirdik
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesStudents.onRendered(function () {
  const self = this;
  // const start = moment().startOf("day");
  // const end = moment().endOf("day");

  this.autorun(function () {
    AppUtil.refreshTokens.get("attendances");
    const filtering = self.filtering.all();
    const groupId = FlowRouter.getParam("groupId");

    if (!groupId) {
      return;
    }

    filtering.groupId = groupId;
    const startDate = self.state.get("startDate");

    const obj = {
      startDate: startDate,

      options: {
        filtering: filtering,
      },
    };
    console.log(obj);
    Meteor.call("attendances.getByDate", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result);

        self.state.set("attendances", result.attendances);
      }
    });
  });
});

Template.publicPagesStudents.events({
  "change #brdDate": function (event, template) {
    // event.preventDefault();
    const date = event.target.value;
    console.log(date); //burda alınan değer string
    template.state.set("startDate", new Date(date)); //string i
  },

  // "submit #brdForm": function (event, template) {
  //   event.preventDefault();

  //   console.log(template.students);

  //   const attendances = template.state.get("attendances"); //students'ı çekiyoruz

  //   const obj = {
  //     getList: [], //dizi oluşturduk
  //   };
  //   console.log(obj);
  // },
});

Template.publicPagesStudents.helpers({
  rendered: function () {
    const self = Template.instance(); //self.state dersek en üst tarafta tanımlanana state' e erişirim
  },
});
