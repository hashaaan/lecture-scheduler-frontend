import axios from "axios";
import { notification } from "antd";

export default {
  state: {
    items: [],
    error: null,
    unsaved: [],
    schedules: [],
    pagination: null,
  }, // initial state

  /**
   * Reducers
   */
  reducers: {
    setUnsaved(state, payload) {
      return {
        ...state,
        unsaved: payload,
      };
    },

    setSchedules(state, payload) {
      return {
        ...state,
        schedules: payload,
      };
    },

    setPagination(state, payload) {
      return {
        ...state,
        pagination: payload,
      };
    },

    resetSchedule() {
      return {};
    },
  },

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    // add schedules to local store
    addSchedule(data) {
      this.setUnsaved(data);
    },

    /**
     * POST to schedules
     *
     * @param {obj} data - data
     * @return {Promise}
     */
    createSchedule(data) {
      // create schedule fuction here
      return new Promise(async (resolve, reject) => {
        return axios
          .post(
            `${process.env.REACT_APP_API_URL}lectureschedule/create`,
            data,
            {
              headers: {
                //Authorization: localStorage.access_token,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              console.log("res", res.status);
              resolve({ success: true });
              if (res.status === 200) {
                notification["success"]({
                  message: "Successfully Created!",
                });
              }
              //this.getCartItems();
            }
            resolve({ success: false });
          })
          .catch((err) => {
            console.log("err", err.response);
            if (err.response) {
              notification["error"]({
                message: "Somthing went wrong !",
                description: "Try again later ...",
              });
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    /**
     * GET cart items
     */
    getSchedules(params = {}) {
      return new Promise(async (resolve, reject) => {
        //if (localStorage.access_token) {
        return axios
          .get(`${process.env.REACT_APP_API_URL}lectureschedule/filter`, {
            params,
            headers: {
              //Authorization: localStorage.access_token,
            },
          })
          .then((res) => {
            if (res.data && !res.data.error) {
              const { schedule } = res.data;
              //console.log("res", schedule);
              this.setSchedules(schedule.data);
              this.setPagination(schedule.pagination);
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err) {
              notification["error"]({
                message: err.message,
                description: "Try again later ...",
              });
              if (err.message === "Network Error") {
                console.log(err.message);
              }
              if (err.response) {
                console.log("Error", err.response);
              }
            }
            reject(err);
          });
        //}
      });
    },

    deleteSchedule(id) {
      return new Promise(async (resolve, reject) => {
        return axios
          .delete(`${process.env.REACT_APP_API_URL}lectureschedule/${id}`, {
            headers: {
              //Authorization: localStorage.access_token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err) {
              notification["error"]({
                message: "Somthing went wrong !",
                description: "Try again later ...",
              });
              if (err.response) {
                console.log("Error", err.response);
              }
            }
            reject(err);
          });
      });
    },

    clearSchedules() {
      this.setSchedules([]);
    },
  }),
};
