import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import DebounceSelect from "./DebouceSelect";

const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    //offset: 8,
    span: 24,
  },
};

class CreateSchedule extends Component {
  state = {
    loadingHalls: false,
    loadingBat: false,
    loadingLec: false,
    loadingSche: false,
    modules: [],
    startTime: null,
    endTime: null,
    //schedules: [],
    key: 0,
  };

  formRef = createRef();

  componentDidMount = () => {
    const { clearHalls, clearBatches, clearLecturers } = this.props;
    clearHalls();
    clearBatches();
    clearLecturers();
  };

  componentDidUpdate = () => {
    //const { addSchedule } = this.props;
    //const { schedules } = this.state;
    //addSchedule(schedules);
    //console.log("DID UPDATE", schedules);
  };

  onReset = () => {
    const { clearHalls, clearBatches, clearLecturers } = this.props;
    this.formRef.current.resetFields();
    clearHalls();
    clearBatches();
    clearLecturers();
  };

  onFinish = (val) => {
    const { createSchedule, onCreate } = this.props;
    const { key } = this.state;
    //let { schedules } = this.state;
    const newkey = key + 1;
    const data = {
      key: newkey,
      module_id: val.module_id,
      batches: val.batches,
      starttime: moment(val.starttime).format("HHmm"),
      endtime: moment(val.endtime).format("HHmm"),
      date: moment(val.date).format("YYYY/MM/DD"),
      lecturer_id: val.lecturer_id,
      status: 1,
      hall_id: val.hall_id,
    };
    // schedules.push(data);
    console.log(data);
    this.setState({ loadingSche: true });
    createSchedule({ data: [data] })
      .then((res) => {
        if (res) {
          this.setState({ loadingSche: false });
          onCreate();
          this.onReset();
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ loadingSche: false });
          //onCreate();
        }
      });
    this.setState({ key: newkey });
  };

  onChangeDivision = (id) => {
    const { getHalls, clearHalls } = this.props;
    if (!id) {
      this.formRef.current.setFieldsValue({ hall_id: null });
      clearHalls();
      return;
    }

    this.setState({ loadingHalls: true });
    getHalls(id)
      .then((res) => {
        if (res) {
          this.setState({ loadingHalls: false });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ loadingHalls: false });
        }
      });
  };

  handleStartTime = (t) => {
    // add 2 hours to endtime
    const endtime = moment(t).add(2, "hours");
    this.formRef.current.setFieldsValue({ endtime });
    this.setState({ startTime: t });
  };

  handleEndTime = (t) => {
    const { startTime } = this.state;
    const endTime = t;
    if (startTime) {
      console.log(startTime.isBefore(endTime));
    }
  };

  onChangeModule = (id) => {
    const { modules } = this.state;
    const { getBatches, getLecturers, clearBatches, clearLecturers } =
      this.props;
    if (!id) {
      this.formRef.current.setFieldsValue({ modulecode: "" });
      this.formRef.current.setFieldsValue({ batches: [] });
      this.formRef.current.setFieldsValue({ lecturer_id: "" });
      clearBatches();
      clearLecturers();
      return;
    }
    //console.log(id, modules);
    const currModule = modules.filter((mod) => mod.id === id);
    if (currModule.length > 0) {
      const modulecode = currModule[0].code;
      this.formRef.current.setFieldsValue({ modulecode });
    }
    this.setState({ loadingBat: true, loadingLec: true });
    getBatches(id)
      .then((res) => {
        if (res) {
          this.setState({ loadingBat: false });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ loadingBat: false });
        }
      });
    getLecturers(id)
      .then((res) => {
        if (res) {
          this.setState({ loadingLec: false });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ loadingLec: false });
        }
      });
  };

  fetchModules = async (keyword) => {
    if (!keyword) return [];
    const params = {
      search_term: keyword,
      page_size: 10,
      all: 0,
    };
    return axios
      .get(`${process.env.REACT_APP_API_URL}modules/active/search`, { params })
      .then((res) => {
        if (res.data) {
          const { modules } = res.data;
          if (modules.data.length > 0) {
            this.setState({ modules: modules.data });
            return modules.data.map((mod) => ({
              label: mod.title,
              value: mod.id,
            }));
          }
        }
      });
  };

  render() {
    const { divisions, halls, batches, lecturers } = this.props;
    const { loadingHalls, loadingBat, loadingLec, loadingSche, startTime } =
      this.state;

    return (
      <Form
        ref={this.formRef}
        name="create-schedule"
        onFinish={this.onFinish}
        className="custom-form"
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Date is required!" }]}
            >
              <DatePicker onChange={() => {}} format="YYYY/MM/DD" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Start Time"
              name="starttime"
              rules={[{ required: true, message: "Start time is required!" }]}
            >
              <TimePicker
                use12Hours={true}
                showSecond={false}
                minuteStep={5}
                format="hh:mm A"
                onChange={(t) => this.handleStartTime(t)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="End Time"
              name="endtime"
              rules={[
                { required: true, message: "End time is required!" },
                {
                  validator: (_, endtime) =>
                    startTime && startTime.isBefore(endtime)
                      ? Promise.resolve()
                      : Promise.reject(new Error("End time is invalid!")),
                },
              ]}
            >
              <TimePicker
                use12Hours={true}
                showSecond={false}
                minuteStep={5}
                format="hh:mm A"
                //onChange={(t) => this.handleEndTime(t)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Division"
              name="division"
              rules={[{ required: true, message: "Division is required!" }]}
            >
              <Select
                allowClear={true}
                placeholder="Select Division"
                onChange={(id) => this.onChangeDivision(id)}
              >
                {divisions &&
                  divisions.length > 0 &&
                  divisions.map((div, i) => (
                    <Option value={div.id} key={i}>
                      {div.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hall No"
              name="hall_id"
              rules={[{ required: true, message: "Hall No is required!" }]}
            >
              <Select
                allowClear={true}
                placeholder="Select Hall"
                //onSelect={(e) => console.log(e)}
                loading={loadingHalls}
                disabled={loadingHalls}
              >
                {halls &&
                  halls.length > 0 &&
                  halls.map((hall, i) => (
                    <Option value={hall.id} key={i}>
                      {hall.hall_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={14}>
            <Form.Item
              label="Module Name"
              name="module_id"
              rules={[{ required: true, message: "Module name is required!" }]}
            >
              <DebounceSelect
                showSearch
                allowClear
                placeholder="Search Modules"
                fetchOptions={this.fetchModules}
                onChange={(id) => this.onChangeModule(id)}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Module Code" name="modulecode">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Batch(es)"
              name="batches"
              rules={[{ required: true, message: "Batch(es) is required!" }]}
            >
              <Select
                mode="multiple"
                allowClear={true}
                placeholder="Select Batch(es)"
                loading={loadingBat}
                disabled={loadingBat}
                id="batch"
              >
                {batches &&
                  batches.length > 0 &&
                  batches.map((bat, i) => (
                    <Option value={bat.id} key={i}>
                      {bat.batch_number.toUpperCase()}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lecturer"
              name="lecturer_id"
              rules={[{ required: true, message: "Lecturer is required!" }]}
            >
              <Select
                allowClear={true}
                placeholder="Select Lecturer"
                loading={loadingLec}
                disabled={loadingLec}
              >
                {lecturers &&
                  lecturers.length > 0 &&
                  lecturers.map((lec, i) => (
                    <Option value={lec.id} key={i}>
                      {lec.full_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item {...tailLayout} className="custom-form-btns">
          <Button htmlType="button" onClick={this.onReset}>
            Clear
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingSche}
            disabled={loadingSche}
          >
            Add Schedule
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  divisions: state.common.divisions,
  halls: state.common.halls,
  batches: state.common.batches,
  lecturers: state.common.lecturers,
  error: state.common.error,
});

const mapDispatchToProps = (dispatch) => ({
  addSchedule: dispatch.schedule.addSchedule,
  createSchedule: dispatch.schedule.createSchedule,
  getDivisions: dispatch.common.getDivisions,
  getHalls: dispatch.common.getHalls,
  getBatches: dispatch.common.getBatches,
  getLecturers: dispatch.common.getLecturers,
  clearHalls: dispatch.common.clearHalls,
  clearBatches: dispatch.common.clearBatches,
  clearLecturers: dispatch.common.clearLecturers,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateSchedule)
);
