import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesStudents.onCreated(function () {
  this.state = new ReactiveDict(null, {
    students: [],
    notFound: false,
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesStudents.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("students");
    const filtering = self.filtering.all();
    const groupId = FlowRouter.getParam("groupId");

    if (!groupId) {
      return;
    }

    filtering.groupId = groupId;

    const obj = {
      options: {
        filtering: filtering,
      },
    };

    Meteor.call("students.list", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result);

        self.state.set("students", result.students);
      }
    });
  });
});
