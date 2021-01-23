module.exports = function(app, router) {
    //app.use("/api", require("./users.js")(router));
    app.use("/", require("./courses.js")(router));
    app.use("/", require("./terms.js")(router));
    app.use("/", require("./assignments.js")(router));
    app.use("/", require("./categories.js")(router));
  };
