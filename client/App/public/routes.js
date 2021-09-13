import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesHome" });
  },
});
FlowRouter.route("/groups", {
  name: "public.groups",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesGroups" });
  },
});
FlowRouter.route("/students/:groupId", {
  name: "public.students",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesStudents" });
  },
});
FlowRouter.route("/attendances/:groupId", {
  name: "public.attendances",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesAttendances" });
  },
});
FlowRouter.route("/attendances/:groupId/:date", {
  name: "public.attendances",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesAttendances" });
  },
});
