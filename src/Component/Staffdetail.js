import React from "react"


function RenderStaff({staff}) {
        
    if(staff != null) {
        return (
            <>
                <Card className ="col-12 col-md-4 col-lg-3">
                    <CardImg src={staff.image} alt= {staff.name}/>
                </Card>
                <Card className="col-12 col-md-8 col-lg-9">
                    <CardBody>
                        <CardTitle><strong>Họ và tên: {staff.name}</strong></CardTitle>
                        <CardText><strong>Ngày sinh:</strong> {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText><strong>Thang lương:</strong> {staff.salaryScale}</CardText>
                        <CardText><strong>Ngày vào công ty:</strong> {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText><strong>Phòng ban:</strong> {staff.department.name}</CardText>
                        <CardText><strong>Số ngày nghỉ còn lại:</strong> {staff.annualLeave} ngày</CardText>
                        <CardText><strong>Số ngày đã làm thêm:</strong> {staff.overTime} ngày</CardText>
                    </CardBody>
                </Card>
                
            </>
        )
    } else {
        return (<div></div>)
    }
}