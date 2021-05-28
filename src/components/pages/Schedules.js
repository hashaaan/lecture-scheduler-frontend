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
  Popconfirm,
} from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CustomSidebar from "../layouts/CustomSidebar";
import CreateSchedule from "../forms/CreateSchedule";
import moment from "moment";
import CustomHeader from "../layouts/CustomHeader";

const { Content } = Layout;
const { Option } = Select;

class Schedules extends Component {
  state = {
    collapsed: false,
    isAddVisible: false,
    loadingSch: false,
    loadingBat: false,
    divisionId: null,
    batchId: null,
  };

  componentDidMount() {
    const { getDivisions, getBatchesByDiv } = this.props;
    getDivisions();
    this.handlePagination(1);
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

  handlePagination = (page) => {
    const { getSchedules } = this.props;
    const { divisionId, batchId } = this.state;
    let params = {
      page_size: 7,
      page,
    };
    if (divisionId) params.batch_type = divisionId;
    if (batchId) params.batch = batchId;
    this.setState({ loadingSch: true });
    getSchedules(params)
      .then((res) => {
        if (res) {
          this.setState({ loadingSch: false });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ loadingSch: false });
        }
      });
  };

  handleDelete = (sch) => {
    const { deleteSchedule } = this.props;
    //console.log("del", sch);
    if (sch) {
      deleteSchedule(sch.id).then((res) => {
        if (res.success) {
          this.handlePagination(1);
        }
      });
    }
  };

  handleDivFilter = (id) => {
    const { getBatchesByDiv, clearDivBatches } = this.props;
    if (id) {
      this.setState({ divisionId: id, loadingBat: true }, () =>
        this.handlePagination(1)
      );
      getBatchesByDiv(id)
        .then((res) => {
          if (res) {
            this.setState({ loadingBat: false });
          }
        })
        .catch((err) => {
          this.setState({ loadingBat: false });
        });
    } else {
      clearDivBatches();
      this.setState({ divisionId: null, batchId: null }, () =>
        this.handlePagination(1)
      );
    }
  };

  handleBatFilter = (id) => {
    if (id) {
      this.setState({ batchId: id }, () => this.handlePagination(1));
    } else {
      this.setState({ batchId: null }, () => this.handlePagination(1));
    }
  };

  handleCreateSch = () => {
    this.handleCancel();
    this.handlePagination(1);
  };

  render() {
    const { collapsed, loadingSch, loadingBat, divisionId, batchId } =
      this.state;
    const { divisions, divbatches, schedules, pagination } = this.props;
    // table columns
    const columns = [
      {
        title: "Division",
        dataIndex: "division",
        key: "division",
        fixed: "left",
        width: 150,
      },
      {
        title: "Batch(es)",
        dataIndex: "batch",
        key: "batch",
        width: 200,
        render: (batches) => (
          <>
            {batches.map((batch) => {
              return (
                <Tag color={"blue"} key={batch}>
                  {batch.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Module Name",
        dataIndex: "modname",
        key: "modname",
        width: 300,
      },
      {
        title: "Module Code",
        key: "modcode",
        dataIndex: "modcode",
        width: 150,
      },
      {
        title: "Lecturer's Name",
        key: "lecturer",
        dataIndex: "lecturer",
        width: 200,
      },
      {
        title: "Hall No",
        key: "hall",
        dataIndex: "hall",
        width: 150,
      },
      {
        title: "Date",
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
        render: (sch) => (
          <Space size="middle">
            <EyeOutlined style={{ color: "blue" }} title="View" />
            <Popconfirm
              title="Are you sure to delete?"
              placement="left"
              onConfirm={() => this.handleDelete(sch)}
              //onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red" }} title="Delete" />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    //console.log(schedules);
    let tblData = [];
    if (schedules && schedules.length > 0) {
      tblData = schedules.map((sch, key) => {
        let batches = [];
        if (sch.batches.length > 0) {
          batches = sch.batches.map((bat) => bat.batch_number.toUpperCase());
        }
        const modname = sch.module[0].title;
        const modcode = sch.module[0].code.toUpperCase();
        const lecturer = sch.lecturer[0].full_name;
        const date = moment(sch.date).format("YYYY/MM/DD");
        const starttime = moment(sch.from).format("hh:mm A");
        const endtime = moment(sch.to).format("hh:mm A");
        let hall = "";
        let division = "";
        if (sch.hall_data) {
          hall = sch.hall_data.hall.hall_name;
          division = sch.hall_data.hall.hall_type.title;
        }
        return {
          key,
          id: sch.id,
          division,
          batch: batches,
          modname,
          modcode,
          lecturer,
          hall,
          date,
          starttime,
          endtime,
        };
      });
    }
    //console.log("pg", pagination);
    return (
      <Layout id="custom-sider">
        <CustomSidebar collapsed={this.state.collapsed} selected={"2"} />
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
              <CalendarOutlined />
              <span>Schedules</span>
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
                style={{ width: 200, marginRight: "20px" }}
                allowClear={true}
                placeholder="Select Division"
                onChange={(id) => this.handleDivFilter(id)}
              >
                {divisions &&
                  divisions.length > 0 &&
                  divisions.map((div, i) => (
                    <Option value={div.id} key={i}>
                      {div.title && div.title}
                    </Option>
                  ))}
              </Select>
              <Select
                style={{ width: 200 }}
                allowClear={true}
                placeholder="Select Batch"
                loading={loadingBat}
                disabled={loadingBat || !divisionId}
                value={batchId}
                onChange={(id) => this.handleBatFilter(id)}
              >
                {divbatches &&
                  divbatches.length > 0 &&
                  divbatches.map((bat, i) => (
                    <Option value={bat.id} key={i}>
                      {bat.batch_number && bat.batch_number.toUpperCase()}
                    </Option>
                  ))}
              </Select>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={this.showAddModal}
              >
                Add New Schedule
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={tblData}
              scroll={{ x: 1600 }}
              loading={loadingSch}
              pagination={{
                total: pagination ? pagination.total : 0,
                position: ["bottomCenter"],
                pageSize: 7,
                onChange: (i) => this.handlePagination(i),
              }}
            />
          </Content>
        </Layout>
        <Modal
          title="Add New Schedule"
          visible={this.state.isAddVisible}
          onCancel={this.handleCancel}
          width={750}
          footer={null}
        >
          <CreateSchedule onCreate={() => this.handleCreateSch()} />
        </Modal>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  divisions: state.common.divisions,
  divbatches: state.common.divbatches,
  unsaved: state.schedule.unsaved,
  schedules: state.schedule.schedules,
  pagination: state.schedule.pagination,
  error: state.common.error,
});

const mapDispatchToProps = (dispatch) => ({
  getDivisions: dispatch.common.getDivisions,
  getBatchesByDiv: dispatch.common.getBatchesByDiv,
  clearDivBatches: dispatch.common.clearDivBatches,
  getSchedules: dispatch.schedule.getSchedules,
  deleteSchedule: dispatch.schedule.deleteSchedule,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Schedules)
);
