import axios from "axios";

const createSchedule = async (data) => {
  console.log("here");
  axios
    .post(`${process.env.REACT_APP_API_URL}lectureschedule/create`)
    .then((res) => {
      console.log(res);
    });
};

export { createSchedule };
