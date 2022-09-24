import React, { Component, Fragment } from 'react';
import dateFormat from 'dateformat';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Card,
    CardTitle,
    CardText,
    CardImg,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import { Loading } from './Loading';
import FormAddStaff from './FormAddStaff';
import { deleteStaff } from '../redux/actions/actionCreatator';

class DetailStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectStaff: {},
            formEdit: false,
            staff: {},
        };
    }
    takeStaff = (data) => {
        const staffID = +data.match.params.id;

        let staffDetail = data.staffs.filter((staff) => {
            return staff.id === staffID;
        });

        return this.renderStaffDetail(staffDetail[0]);
    };
    renderStaffDetail(staff) {
        if (staff !== undefined) {
            const { name, doB, startDate, overTime, annualLeave, image } =
                staff;

            const startDateFormat = dateFormat(startDate, 'dd/mm/yyyy');
            const doBFormat = dateFormat(doB, 'dd/mm/yyyy');
            return (
                <Fragment>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{name || 'HV'}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <Card>
                                <CardImg
                                    width={'100%'}
                                    src={image}
                                    alt={name || 'HV'}
                                />
                            </Card>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="p-4">
                                <CardTitle tag={'h4'}>
                                    Họ và tên: {name}
                                </CardTitle>
                                <CardText>Ngày sinh: {doBFormat}</CardText>
                                <CardText>
                                    Ngày bắt đầu làm việc: {startDateFormat}
                                </CardText>
                                <CardText>
                                    Phòng ban:{' '}
                                    {staff.departmentId === 'Dept01'
                                        ? 'Sale'
                                        : staff.departmentId === 'Dept02'
                                        ? 'HR'
                                        : staff.departmentId === 'Dept03'
                                        ? 'Marketing'
                                        : staff.departmentId === 'Dept04'
                                        ? 'IT'
                                        : 'Finance'}
                                </CardText>
                                <CardText>
                                    Số ngày nghỉ còn lại: {annualLeave}
                                </CardText>
                                <CardText>
                                    Số ngày đã làm thêm: {overTime}
                                </CardText>

                                <div className="mt-5">
                                    <button
                                        onClick={() =>
                                            this.handleDeleteStaff(staff.id)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            this.handelEditStaff(staff.id)
                                        }
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <div>
                    <h1>Khong tim thay nhan vien</h1>
                    <a href="/" style={{ textDecoration: 'underline' }}>
                        Quay lai trang chu
                    </a>
                </div>
            );
        }
    }

    // delete

    handleDeleteStaff(idStaff) {
        if (window.confirm('Bạn chắc chắn muốn xóa nhân viên này ?')) {
            this.props.deleteStaffID(idStaff);
            alert('Xóa thành công nhân viên');
            this.props.history.push('/');
        } else {
            console.log('k xoa');
        }
    }

    // Edit
    handelEditStaff(id) {
        if (id) {
            const staffId = this.props.staffs.filter(
                (staff) => staff.id === id
            );
            let doBFormat = dateFormat(staffId[0].doB, 'yyyy-mm-dd');
            let startDateFormat = dateFormat(
                staffId[0].startDate,
                'yyyy-mm-dd'
            );
            let dept =
                staffId[0].departmentId === 'Dept01'
                    ? 'Sale'
                    : staffId[0].departmentId === 'Dept02'
                    ? 'HR'
                    : staffId[0].departmentId === 'Dept03'
                    ? 'Marketing'
                    : staffId[0].departmentId === 'Dept04'
                    ? 'IT'
                    : 'Finance';
            const newIdStaff = {
                ...staffId[0],
                doB: doBFormat,
                startDate: startDateFormat,
                departmentId: dept,
            };

            this.setState({ formEdit: true, staff: newIdStaff });
        }
    }

    render() {
        console.log(this.state.staff);
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <div className="center">
                    <Loading />
                </div>
            );
        }
        return (
            <div className="container-fluid mb-3">
                <Fragment>{this.takeStaff(this.props)}</Fragment>
                {this.state.formEdit && (
                    <FormAddStaff
                        showFormAdd={() => this.props.handleToggleModal(false)}
                        staff={this.state.staff}
                        editStaff={this.props.editStaff}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStaffID: (id) => dispatch(deleteStaff(id)),
    };
};

export default withRouter(connect(null, mapDispatchToProps)(DetailStaff));
