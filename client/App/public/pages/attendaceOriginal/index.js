import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesAttendanceOriginal.onCreated(function () {
  this.state = new ReactiveDict(null, {
    attendances: [],
    notFound: false,
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesAttendanceOriginal.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("attendances");
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

    Meteor.call("attendances.list", obj, function (error, result) {
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
