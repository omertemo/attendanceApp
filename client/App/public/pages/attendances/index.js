import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesAttendances.onCreated(function () {
  this.state = new ReactiveDict(null, {
    students: [],
    notFound: false,
  });
  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagesAttendances.onRendered(function () {
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
Template.publicPagesAttendances.events({
  "change #brdDate": function (event, template) {
    // event.preventDefault();
    const date = event.target.value;
    console.log(date); //burda alınan değer string
    template.date = new Date(date); //string i
  },

  "submit #brdForm": function (event, template) {
    event.preventDefault();

    console.log(template.students);

    const students = template.state.get("students"); //students'ı çekiyoruz

    const obj = {
      attendances: [], //dizi oluşturduk
    };

    students.forEach((student) => {
      const checked = event.target[student._id].checked; //unique bir property(?) ile ???

      obj.attendances.push({
        //attendance elemanlarının objeye push eidyoruz
        date: template.date,
        studentId: student._id,
        groupId: student.groupId,
        status: checked,
      });
      // const checked = event.target.recep.checked
      // const checked = event.target.ömer.checked
    });

    console.log(obj);

    Meteor.call("attendances.createBulk", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      if (result) {
        console.log(result);
      }
    });
  },
});
