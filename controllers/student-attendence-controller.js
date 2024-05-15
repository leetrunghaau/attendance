const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-service");
const StudentService = require('../services/student-service');
const StudentAttendenceService = require('../services/student-attdence-service');
const moment = require('moment');
const ScheduleItemService = require('../services/schedule-item-service');
const { subtractMinutes } = require('../helper/generate-key');
async function updateAttendances(listUpdate) {
    listUpdate.forEach(async (item) => {
        if (item) {
            try {
                const { studentAttendanceId, ...value } = item;
                let temp = await StudentAttendenceService.updateStudentAttendence(studentAttendanceId, value);

            } catch (error) {
                throw error
            }
        }
    });
}
class StudentAttendenceController {
    // user role
    static async studentAttendenceCheckIn(req, res, next) {
        try {

            // kiểm tra học sinh điểm danh đúng lớp
            const driver = await DriverService.getDriverById(req.body.driverId)
            if (!driver) {
                return next(createError.InternalServerError("lỗi dữ liệu: không tìm thấy driver id phù hợp"))
            }
            const student = await StudentService.getStudentById(req.body.studentId)
            if (!student) {
                return next(createError.InternalServerError("lỗi dữ liệu: học sinh này không có trong data"))
            }
            if (driver.classRoomId != student.classRoomId) {
                return res.status(200).json({
                    status: 200,
                    message: "học sinh không đúng lớp",

                })
            }

            const currentDate = moment().utcOffset('+07:00').format('YYYY-MM-DD');
            const currentTime = moment().utcOffset('+07:00').format('HH:mm:ss');
            // const currentTime = req.body.currentTime;
            let listAtten = await StudentAttendenceService.getAllStudentAttendenceByStudentAndDate(req.body.studentId, currentDate)
            if (listAtten.length == 0) {
                //     //xử lý điểm nếu điểm danh lần đầu
                const listScheduleItem = await ScheduleItemService.getAllScheduleItemByClassRoomAndDate(student.classRoomId, currentDate);
                listAtten = listScheduleItem.map((item) => {
                    let atten = {
                        studentId: req.body.studentId,
                        scheduleItemId: item.scheduleItemId,
                        attendenceStatus: null,
                        attendenceDate: currentDate,
                        checkinTime: null,
                        checkoutTime: null
                    }
                    if (item.Lesson.timeStart < currentTime && item.Lesson.timeEnd > currentTime) {
                        if (subtractMinutes(currentTime, item.Lesson.timeStart) <= 5) {
                            atten.attendenceStatus = "Hiện diện";
                        } else if (subtractMinutes(currentTime, item.Lesson.timeStart) <= 20) {
                            atten.attendenceStatus = "Vào trễ";
                            atten.checkinTime = currentTime;
                        }{
                            atten.attendenceStatus = "Cúp tiết";
                            atten.checkinTime = currentTime;
                        }

                    } else if (item.Lesson.timeEnd <= currentTime) {
                        atten.attendenceStatus = "Vắng";
                    } else {
                        atten.attendenceStatus = "Hiện diện";
                    }
                    return atten;
                })
                listAtten = await StudentAttendenceService.createMultipleStudentAttendence(listAtten);
            } else {

                const listAttenUpdate = listAtten.map((item) => {
                    let atten = {
                        studentAttendanceId: item.studentAttendanceId,
                        studentId: item.studentId,
                        scheduleItemId: item.scheduleItemId,
                        attendenceStatus: item.attendenceStatus,
                        attendenceDate: item.attendenceDate,
                        checkinTime: item.checkinTime,
                        checkoutTime: item.checkoutTime
                    };
                    let updateFlat = false;
                    if (item.ScheduleItem.Lesson.timeStart >= currentTime) {
                        atten.attendenceStatus = "Hiện diện";
                        updateFlat = true;
                    } else if (item.ScheduleItem.Lesson.timeStart < currentTime && item.ScheduleItem.Lesson.timeEnd > currentTime) {
                        if (item.checkinTime != null) { // có vào lớp tiết này thì ra lớp chắc chắn ra lớp phải là tiết này  (vì đang vào cùng tiết)
                            if (!item.checkoutTime) {
                                // throw new Error('trong một tiết có đi vô, không thấy đia ra và đang đi vô (magic)');
                                //trong một tiết có đi vô, không thấy đia ra và đang đi vô (magic)
                            } else {
                                //vào trễ
                                if (subtractMinutes(currentTime, item.checkoutTime) <= 10) {
                                    //thời gian ra ngoài ngắn => vẫn tiếp tục trạng thái cũ vào trể  
                                    atten.attendenceStatus = "vào trễ";
                                    updateFlat = true;
                                } else {
                                    // vào trễ cúp giũa tiết và vào lớp
                                    atten.attendenceStatus = "vào trễ, cúp tiết";
                                    atten.checkinTime = currentTime;
                                    updateFlat = true;
                                }
                            }
                        } else {
                            if (item.checkoutTime != null) {
                                if (subtractMinutes(currentTime, item.checkoutTime) <= 10) {
                                    //thời gian ra ngoài ngắn => vẫn tiếp tục tiếp tục học (hiện diện) 
                                    atten.attendenceStatus = "Hiện diện";
                                    atten.checkoutTime = null;
                                    updateFlat = true;
                                } else {
                                    // vào trễ cúp giũa tiết và vào lớp (cúp giữa tiết)
                                    atten.attendenceStatus = "Cúp tiết";
                                    atten.checkinTime =currentTime;
                                    updateFlat = true;
                                }
                            } else {
                                if (subtractMinutes(currentTime, item.ScheduleItem.Lesson.timeStart) <= 5) {
                                    // vào trể nhỏ hơn 10 phút => hiện diện
                                    atten.attendenceStatus = "Hiện diện";
                                    updateFlat = true;
                                } else if (subtractMinutes(currentTime, item.ScheduleItem.Lesson.timeStart) <= 20) {
                                    // vào trể nhỏ hơn 20 phút => vào trể
                                    atten.attendenceStatus = "Vào trể";
                                    atten.checkinTime = currentTime
                                    updateFlat = true;
                                } else {
                                    //vào trể lớn hơn 20 phút => cúp tiết
                                    atten.attendenceStatus = "Cúp tiết";
                                    atten.checkinTime = currentTime
                                    updateFlat = true;
                                }

                            }
                        }
                    }
                    if (updateFlat) {
                        return atten
                    }
                })
                await updateAttendances(listAttenUpdate)
                return res.status(200).json({
                    status: 200,
                    message: "done att",
                    data: listAttenUpdate
                })

            }

            return res.status(200).json({
                status: 200,
                message: "done att",
                data: listAtten
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError(error.message));
        }
    }
    static async studentAttendenceCheckOut(req, res, next) {
        try {

            // kiểm tra học sinh điểm danh đúng lớp
            const driver = await DriverService.getDriverById(req.body.driverId)
            if (!driver) {
                return next(createError.InternalServerError("lỗi dữ liệu: không tìm thấy driver id phù hợp"))
            }
            const student = await StudentService.getStudentById(req.body.studentId)
            if (!student) {
                return next(createError.InternalServerError("lỗi dữ liệu: học sinh này không có trong data"))
            }
            if (driver.classRoomId != student.classRoomId) {
                return res.status(200).json({
                    status: 200,
                    message: "học sinh không đúng lớp",

                })
            }

            const currentDate = moment().utcOffset('+07:00').format('YYYY-MM-DD');
            const currentTime = moment().utcOffset('+07:00').format('HH:mm:ss');
            // const currentTime = req.body.currentTime;
            let listAtten = await StudentAttendenceService.getAllStudentAttendenceByStudentAndDate(req.body.studentId, currentDate)

            const listAttenUpdate = listAtten.map((item) => {
                let atten = {
                    studentAttendanceId: item.studentAttendanceId,
                    studentId: item.studentId,
                    scheduleItemId: item.scheduleItemId,
                    attendenceStatus: item.attendenceStatus,
                    attendenceDate: item.attendenceDate,
                    checkinTime: item.checkinTime,
                    checkoutTime: item.checkoutTime
                };
                let updateFlat = false;
                if (item.ScheduleItem.Lesson.timeStart >= currentTime) {
                    atten.attendenceStatus = "Vắng";
                    updateFlat = true;
                } else if (item.ScheduleItem.Lesson.timeStart < currentTime && item.ScheduleItem.Lesson.timeEnd > currentTime) {
                    if (subtractMinutes(item.ScheduleItem.Lesson.timeEnd, currentTime) <= 5) {
                        atten.attendenceStatus = atten.attendenceStatus ;
                        atten.checkoutTime = currentTime
                        updateFlat = true;
                    }else if (subtractMinutes(item.ScheduleItem.Lesson.timeEnd, currentTime) <= 20) {
                        atten.attendenceStatus = atten.attendenceStatus + " + Ra tiết sớm";
                        atten.checkoutTime = currentTime
                        updateFlat = true;
                    }else{
                        atten.attendenceStatus = atten.attendenceStatus + " + Cúp tiết";
                        atten.checkoutTime = currentTime
                    }
                }
                if (updateFlat) {
                    return atten
                }
            })
            await updateAttendances(listAttenUpdate)
            return res.status(200).json({
                status: 200,
                message: "done att",
                data: listAttenUpdate
            })

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError(error.message));
        }
    }
    static async studentAttendenceCheckInTest(req, res, next) {
        try {

            // kiểm tra học sinh điểm danh đúng lớp
            const driver = await DriverService.getDriverById(req.body.driverId)
            if (!driver) {
                return next(createError.InternalServerError("lỗi dữ liệu: không tìm thấy driver id phù hợp"))
            }
            const student = await StudentService.getStudentById(req.body.studentId)
            if (!student) {
                return next(createError.InternalServerError("lỗi dữ liệu: học sinh này không có trong data"))
            }
            if (driver.classRoomId != student.classRoomId) {
                return res.status(200).json({
                    status: 200,
                    message: "học sinh không đúng lớp",

                })
            }

            const currentDate = moment().utcOffset('+07:00').format('YYYY-MM-DD');
            // const currentTime = moment().utcOffset('+07:00').format('HH:mm:ss');
            const currentTime = req.body.currentTime;
            let listAtten = await StudentAttendenceService.getAllStudentAttendenceByStudentAndDate(req.body.studentId, currentDate)
            if (listAtten.length == 0) {
                //     //xử lý điểm nếu điểm danh lần đầu
                const listScheduleItem = await ScheduleItemService.getAllScheduleItemByClassRoomAndDate(student.classRoomId, currentDate);
                listAtten = listScheduleItem.map((item) => {
                    let atten = {
                        studentId: req.body.studentId,
                        scheduleItemId: item.scheduleItemId,
                        attendenceStatus: null,
                        attendenceDate: currentDate,
                        checkinTime: null,
                        checkoutTime: null
                    }
                    if (item.Lesson.timeStart < currentTime && item.Lesson.timeEnd > currentTime) {
                        if (subtractMinutes(currentTime, item.Lesson.timeStart) < 10) {
                            atten.attendenceStatus = "Hiện diện";
                            atten.checkinTime = currentTime;
                        } else {
                            atten.attendenceStatus = "Vào trễ";
                            atten.checkinTime = currentTime;
                        }

                    } else if (item.Lesson.timeEnd <= currentTime) {
                        atten.attendenceStatus = "Vắng";
                    } else {
                        atten.attendenceStatus = "Hiện diện";
                    }
                    return atten;
                })
                listAtten = await StudentAttendenceService.createMultipleStudentAttendence(listAtten);
            } else {

                const listAttenUpdate = listAtten.map((item) => {
                    let atten = item;
                    let updateFlat = false;
                    if (item.ScheduleItem.Lesson.timeStart >= currentTime) {
                        atten.attendenceStatus = "Hiện diện";
                        updateFlat = true;
                    } else if (item.ScheduleItem.Lesson.timeStart < currentTime && item.ScheduleItem.Lesson.timeEnd > currentTime) {
                        if (item.checkinTime != null) { // có vào lớp tiết này thì ra lớp chắc chắn ra lớp phải là tiết này  (vì đang vào cùng tiết)
                            if (!item.checkoutTime) {
                                // throw new Error('trong một tiết có đi vô, không thấy đia ra và đang đi vô (magic)');
                                //trong một tiết có đi vô, không thấy đia ra và đang đi vô (magic)
                            } else {
                                //vào trễ
                                if (subtractMinutes(currentTime, item.checkoutTime) < 25) {
                                    //thời gian ra ngoài ngắn => vẫn tiếp tục trạng thái cũ vào trể  
                                    atten.attendenceStatus = "vào trễ";
                                    updateFlat = true;
                                } else {
                                    // vào trễ cúp giũa tiết và vào lớp
                                    atten.attendenceStatus = "vào trễ, cúp tiết";
                                    updateFlat = true;
                                }
                            }
                        } else {
                            if (item.checkoutTime != null) {
                                if (subtractMinutes(currentTime, item.checkoutTime) < 25) {
                                    //thời gian ra ngoài ngắn => vẫn tiếp tục tiếp tục học (hiện diện) 
                                    atten.attendenceStatus = "Hiện diện";

                                    updateFlat = true;
                                } else {
                                    // vào trễ cúp giũa tiết và vào lớp (cúp giữa tiết)
                                    atten.attendenceStatus = "Cúp tiết";
                                    updateFlat = true;
                                }
                            } else {
                                if (subtractMinutes(currentTime, item.ScheduleItem.Lesson.timeStart) < 10) {
                                    // vào trể nhỏ hơn 10 phút => hiện diện
                                    atten.attendenceStatus = "Hiện diện";
                                    updateFlat = true;
                                } else if (subtractMinutes(currentTime, item.ScheduleItem.Lesson.timeStart) < 25) {
                                    // vào trể nhỏ hơn 20 phút => vào trể
                                    atten.attendenceStatus = "Vào trể";
                                    updateFlat = true;
                                } else {
                                    //vào trể lớn hơn 20 phút => cúp tiết
                                    atten.attendenceStatus = "Cúp tiết";
                                    updateFlat = true;
                                }

                            }
                        }
                    }
                    if (updateFlat) {
                        return atten
                    }
                })
                updateAttendances(listAttenUpdate)
                return res.status(200).json({
                    status: 200,
                    message: "done att",
                    data: listAttenUpdate
                })

            }

            return res.status(200).json({
                status: 200,
                message: "done att",
                data: listAtten
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError(error.message));
        }
    }
    static async studentAttendenceCheckOutTest(req, res, next) {
        try {

            // kiểm tra học sinh điểm danh đúng lớp
            const driver = await DriverService.getDriverById(req.body.driverId)
            if (!driver) {
                return next(createError.InternalServerError("lỗi dữ liệu: không tìm thấy driver id phù hợp"))
            }
            const student = await StudentService.getStudentById(req.body.studentId)
            if (!student) {
                return next(createError.InternalServerError("lỗi dữ liệu: học sinh này không có trong data"))
            }
            if (driver.classRoomId != student.classRoomId) {
                return res.status(200).json({
                    status: 200,
                    message: "học sinh không đúng lớp",

                })
            }

            const currentDate = moment().utcOffset('+07:00').format('YYYY-MM-DD');
            // const currentTime = moment().utcOffset('+07:00').format('HH:mm:ss');
            const currentTime = req.body.currentTime;
            let listAtten = await StudentAttendenceService.getAllStudentAttendenceByStudentAndDate(req.body.studentId, currentDate)

            const listAttenUpdate = listAtten.map((item) => {
                let atten = item;
                let updateFlat = false;
                if (item.ScheduleItem.Lesson.timeStart >= currentTime) {
                    atten.attendenceStatus = "Vắng";
                    updateFlat = true;
                } else if (item.ScheduleItem.Lesson.timeStart < currentTime && item.ScheduleItem.Lesson.timeEnd > currentTime) {
                    if (subtractMinutes(item.ScheduleItem.Lesson.timeEnd, currentTime) > 5) {
                        atten.attendenceStatus = atten.attendenceStatus + " + ra tiết sớm";
                        updateFlat = true;
                    }
                }
                if (updateFlat) {
                    return atten
                }
            })
            updateAttendances(listAttenUpdate)
            return res.status(200).json({
                status: 200,
                message: "done att",
                data: listAttenUpdate
            })

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError(error.message));
        }
    }



}

module.exports = StudentAttendenceController;
