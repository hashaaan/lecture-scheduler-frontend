import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Breadcrumb,
  Table,
  Tag,
  Space,
  Select,
  Button,
  Modal,
} from "antd";
import {
  HomeOutlined,
  BankOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CustomSidebar from "../layouts/CustomSidebar";
import CreateSchedule from "../forms/CreateSchedule";
import CustomHeader from "../layouts/CustomHeader";
// import moment from "moment";

const { Header, Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Division",
    dataIndex: "division",
    key: "division",
    fixed: "left",
    width: 150,
  },
  {
    title: "Hall No",
    key: "hall_no",
    dataIndex: "hall_no",
    width: 150,
  },
  {
    title: "Hall Name",
    dataIndex: "hall_name",
    key: "hall_name",
    width: 200,
  },
  {
    title: "Hall Category",
    key: "hall_cat",
    dataIndex: "hall_cat",
    width: 150,
  },
  {
    title: "Hall Type",
    dataIndex: "hall_type",
    key: "hall_type",
    width: 100,
  },
  {
    title: "Lecturer Name",
    key: "lecturer",
    dataIndex: "lecturer",
    width: 250,
  },
  {
    title: "Module Code",
    key: "modcode",
    dataIndex: "modcode",
    width: 150,
  },
  {
    title: "Lecture Date",
    key: "date",
    dataIndex: "date",
    width: 150,
  },
  {
    title: "Start Time",
    key: "starttime",
    dataIndex: "starttime",
    width: 100,
  },
  {
    title: "End Time",
    key: "endtime",
    dataIndex: "endtime",
    width: 100,
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 100,
    render: (id) => (
      <Space size="middle">
        <EyeOutlined style={{ color: "blue" }} title="View" />
        <DeleteOutlined style={{ color: "red" }} title="Delete" />
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    division: "IT",
    hall_no: "AUD02",
    hall_name: "Auditorium 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "IOS19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
  {
    key: "2",
    division: "Management",
    hall_no: "PCLAB02",
    hall_name: "PC Lab 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "IOS19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
  {
    key: "3",
    division: "IT",
    hall_no: "H02",
    hall_name: "Hall 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "IOS19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
  {
    key: "4",
    division: "IT",
    hall_no: "AUD02",
    hall_name: "Auditorium 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "IOS19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
  {
    key: "5",
    division: "IT",
    hall_no: "AUD02",
    hall_name: "Auditorium 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "AI19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
  {
    key: "6",
    division: "IT",
    hall_no: "AUD02",
    hall_name: "Auditorium 02",
    hall_cat: "Large",
    hall_type: "A/C",
    lecturer: "Mr. Thisara Weesinghe",
    modcode: "WEB19.1",
    date: "2021/04/17",
    starttime: "6.00 PM",
    endtime: "8.30 PM",
  },
];

class Halls extends Component {
  state = {
    collapsed: false,
    isAddVisible: false,
  };

  componentDidMount() {
    //const { getDivisions, getSchedules } = this.props;
    //getDivisions();
    //getSchedules();
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showAddModal = () => {
    this.setState({ isAddVisible: true });
  };

  handleOk = () => {
    this.setState({ isAddVisible: false });
  };

  handleCancel = () => {
    this.setState({ isAddVisible: false });
  };

  onDateChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    const { collapsed } = this.state;
    const { divisions, schedules } = this.props;
    // console.log(schedules);
    // let tblData = [];
    // if (schedules && schedules.length > 0) {
    //   tblData = schedules.map((sch, i) => {
    //     let batches = [];
    //     if (sch.batches.length > 0) {
    //       batches = sch.batches.map((bat) => bat.batch_number.toUpperCase());
    //     }
    //     const modname = sch.module[0].title;
    //     const modcode = sch.module[0].code.toUpperCase();
    //     const lecturer = sch.lecturer[0].full_name;
    //     const date = moment(sch.date).format("YYYY/MM/DD");
    //     const starttime = moment(sch.from).format("HH:mm A");
    //     const endtime = moment(sch.to).format("HH:mm A");
    //     return {
    //       key: i,
    //       division: "IT",
    //       batch: batches,
    //       modname,
    //       modcode,
    //       lecturer,
    //       hall: "Hall 15",
    //       date,
    //       starttime,
    //       endtime,
    //     };
    //   });
    // }
    // console.log("tbl", tblData);
    return (
      <Layout id="custom-sider">
        <CustomSidebar collapsed={collapsed} selected={"6"} />
        <Layout className="site-layout">
          <CustomHeader collapsed={collapsed} toggle={this.toggle} />
          <Breadcrumb
            style={{
              marginTop: "24px",
              marginLeft: "auto",
              marginRight: "24px",
            }}
          >
            <Breadcrumb.Item href="/">
              <HomeOutlined />
              <span>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <BankOutlined />
              <span>Halls</span>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "80vh",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <Select
                style={{
                  width: 200,
                  marginRight: "20px",
                  marginBottom: "20px",
                  float: "left",
                }}
                allowClear={true}
                placeholder="Select Division"
              >
                {divisions &&
                  divisions.length > 0 &&
                  divisions.map((div, i) => (
                    <Option value={div.id} key={i}>
                      {div.title}
                    </Option>
                  ))}
              </Select>
              <Button
                type="primary"
                style={{ float: "right", width: 200 }}
                //onClick={this.showAddModal}
              >
                Add Hall
              </Button>
            </div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1600 }} />
          </Content>
        </Layout>
        <Modal
          title="Add New Schedule"
          visible={this.state.isAddVisible}
          onCancel={this.handleCancel}
          width={750}
          footer={null}
        >
          <CreateSchedule onCancel={this.handleCancel} />
        </Modal>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  divisions: state.common.divisions,
  unsaved: state.schedule.unsaved,
  schedules: state.schedule.schedules,
  error: state.common.error,
});

const mapDispatchToProps = (dispatch) => ({
  getDivisions: dispatch.common.getDivisions,
  getSchedules: dispatch.schedule.getSchedules,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Halls));
