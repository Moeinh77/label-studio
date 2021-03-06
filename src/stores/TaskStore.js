import { types, getParent } from "mobx-state-tree";

import Utilities from "../utils";

/**
 * Task Store
 */
const TaskStore = types
  .model("Task", {
    /**
     * Id of task
     */
    id: types.identifierNumber,
    /**
     * Data of task, may contain an object but in App Store will be transformed into string
     * MST doesn't support processing of dynamic objects with unkown keys value
     */
    data: types.maybeNull(types.string),
    // data: types.maybeNull(TaskData),
    /**
     * Id of project
     */
    project: types.maybeNull(types.number),
  })
  .views(self => ({
    get app() {
      return getParent(self);
    },

    /**
     * Return JSON with task data
     * @returns {object}
     */
    get dataObj() {
      if (Utilities.Checkers.isStringJSON(self.data)) {
        return JSON.parse(self.data);
      } else if (typeof self.data === "object") {
        return self.data;
      } else {
        return null;
      }
    },
  }));

export default TaskStore;
