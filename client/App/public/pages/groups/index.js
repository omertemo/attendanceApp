Template.publicPagesGroups.onCreated(function () {
  this.state = new ReactiveDict(null, {
    groups: [],
    notFound: false,
  });
});

Template.publicPagesGroups.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("groups");

    Meteor.call("groups.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result);

        self.state.set("groups", result.groups);
      }
    });
  });
});
