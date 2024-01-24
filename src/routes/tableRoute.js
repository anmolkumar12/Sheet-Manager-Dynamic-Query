const tableDataRouter = require("express").Router();
const resHndlr = require("../core/resHandler");
const middleware = require("../middleware/authentication");
const tableController = require("../controller/tableController");

tableDataRouter.route("/read")
  .post(async (req, res, next) => {
    try {
      const result = await tableController.getTableData(JSON.parse(JSON.stringify(req.body)));
      resHndlr.sendSuccess(res, result);
    } catch (error) {
      resHndlr.sendError(res, error);
    }
  })

tableDataRouter.route("/update")
  .patch(async (req, res, next) => {
    try {
      const result = await tableController.updateTableRecord(JSON.parse(JSON.stringify(req.body)));
      resHndlr.sendSuccess(res, result);
    } catch (error) {
      resHndlr.sendError(res, error);
    }
  })

tableDataRouter.route("/create")
  .post(async (req, res, next) => {
    try {
      const result = await tableController.createTableRecord(JSON.parse(JSON.stringify(req.body)));
      resHndlr.sendSuccess(res, result);
    } catch (error) {
      resHndlr.sendError(res, error);
    }
  })

tableDataRouter.route("/export")
  .get(async (req, res, next) => {
    try {
      const result = await tableController.getExportTableData(JSON.parse(JSON.stringify(req.body)));
      resHndlr.sendSuccess(res, result);
    } catch (error) {
      resHndlr.sendError(res, error);
    }
  })

module.exports = tableDataRouter;
