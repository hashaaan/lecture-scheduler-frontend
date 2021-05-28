import axios from "axios";
// import { notification } from "antd";

// const firstLetterUC = (string) => {
//   if (string) return string.charAt(0).toUpperCase() + string.slice(1);
// };

export default {
  // initial state
  state: {
    divisions: [],
    halls: [],
    batches: [],
    divbatches: [],
    lecturers: [],
    error: null,
  },

  /**
   * Reducers
   */
  reducers: {
    setDivisions(state, payload) {
      return {
        ...state,
        divisions: payload,
      };
    },

    setHalls(state, payload) {
      return {
        ...state,
        halls: payload,
      };
    },

    setBatches(state, payload) {
      return {
        ...state,
        batches: payload,
      };
    },

    setDivBatches(state, payload) {
      return {
        ...state,
        divbatches: payload,
      };
    },

    setLecturers(state, payload) {
      return {
        ...state,
        lecturers: payload,
      };
    },

    setError(state, payload) {
      return {
        ...state,
        error: payload,
      };
    },

    resetCommon() {
      return {};
    },
  },

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Get the smartphones list
     *
     * @returns {Promise}
     */
    getDivisions() {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}batchtypes`)
          .then((res) => {
            //console.log("div", res);
            if (res.data) {
              const { data } = res.data;
              this.setDivisions(data);
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err.response) {
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    getHalls(div) {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}halls/getbytype/${div}`)
          .then((res) => {
            //console.log("halls", res);
            if (res.data) {
              const { halls } = res.data;
              this.setHalls(halls);
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err.response) {
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    clearHalls() {
      this.setHalls([]);
    },

    getBatches(mod) {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}modules/batches/${mod}`)
          .then((res) => {
            //console.log("bat", res);
            if (res.data) {
              // modules means batches
              const { modules } = res.data;
              //console.log(modules);
              this.setBatches(modules);
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err.response) {
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    clearBatches() {
      this.setBatches([]);
    },

    getBatchesByDiv(div) {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}batch/getbytype/${div}`)
          .then((res) => {
            //console.log("bat", res);
            if (res.data) {
              const { batches } = res.data;
              //console.log(batches.data);
              if (batches.data) {
                this.setDivBatches(batches.data);
              }
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err.response) {
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    clearDivBatches() {
      this.setDivBatches([]);
    },

    getLecturers(mod) {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}modules/lecturers/${mod}`)
          .then((res) => {
            //console.log("lec", res);
            if (res.data) {
              // modules means lecturers
              const { modules } = res.data;
              //console.log(modules);
              this.setLecturers(modules);
              resolve({ success: true });
            }
            resolve({ success: false });
          })
          .catch((err) => {
            if (err.response) {
              console.log("Error", err.response);
            }
            reject(err);
          });
      });
    },

    clearLecturers() {
      this.setLecturers([]);
    },
  }),
};
