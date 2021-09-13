Migrations.add({
  version: 1,
  name: "Örnek veriler yükleniyor",
  up: function () {
    const groupId1 = Groups.insert({
      name: "1A",
      description: "1A sınıfı öğrencileri",
    });

    const groupId2 = Groups.insert({
      name: "1B",
    });

    for (let index = 0; index < 20; index++) {
      Students.insert({
        firstName: `Firstname ${index}`,
        lastName: `Lastname ${index}`,
        number: parseInt(Random.fraction() * 1000),
        groupId: Random.choice([groupId1, groupId2]),
      });
    }

    const today = new Date();

    group1Students = Students.find({ groupId: groupId1 }).fetch();
    group2Students = Students.find({ groupId: groupId2 }).fetch();

    group1Students.forEach(function (student) {
      Attendances.insert({
        student: student,
        groupId: groupId1,
        date: today,
      });
    });

    group2Students.forEach(function (student) {
      Attendances.insert({
        student: student,
        groupId: groupId2,
        date: today,
      });
    });
  },
});
