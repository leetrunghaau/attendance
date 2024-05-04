const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-service");
const StudentAttendenceService = require('../services/student-attdence-service');
const TeacherAttendenceService = require('../services/teacher-attdence-service');
const { generateId } = require('../helpers/generate-key');

class ReportAttendenceController {

    static async reportAttendenceStudent(req, res, next) {
        try {
            const attdences = await StudentAttendenceService.getAllStudentAttendenceByClassRoomAndDate(req.body.classRoomId, req.body.indexDate)
            if (!attdences) {

                return next(createError.BadRequest(`Không tìm được Driver`));

            }
            // xử lý dữ liệu

            //lesson
            const lessonMap = new Map();

            attdences.forEach(attendance => {
                const lessonId = attendance.ScheduleItem.lessonId;
                if (!lessonMap.has(lessonId)) {
                    lessonMap.set(lessonId, attendance.ScheduleItem.Lesson);
                }
            });
            const uniqueLessons = Array.from(lessonMap.values());
            const sortedLessons = uniqueLessons.sort((a, b) => {
                const timeA = a.timeStart.split(":");
                const timeB = b.timeStart.split(":");
                return parseInt(timeA[0]) * 60 + parseInt(timeA[1]) - (parseInt(timeB[0]) * 60 + parseInt(timeB[1]));
            });
           
            const lessonHeader = [{
                lessonId: "studentName",
                lessonName: "Họ và tên",
            },
            {
                lessonId: "actions",
                lessonName: " ",
            }]
            const studentMap = new Map();
            attdences.forEach(attendance => {
                const studentId = attendance.studentId;
                if (!studentMap.has(studentId)) {
                    studentMap.set(studentId, attendance.Student);
                }
            });
            let uniqueStudent = Array.from(studentMap.values());

            const studentLessonArray = uniqueStudent.map(student => {
                const studentLessons = attdences.filter(a => a.Student.studentId === student.studentId)
                    .reduce((lessons, attendance) => {
                        lessons[attendance.ScheduleItem.Lesson.lessonId] = {
                            attendenceStatus: attendance.attendenceStatus,
                            checkinTime: attendance.checkinTime,
                            checkoutTime: attendance.checkoutTime
                        };
                        return lessons;
                    }, {});
                return {
                    studentId: student.studentId,
                    fullName: student.fullName,
                    phone: student.phone,
                    gender: student.gender,
                    birthDate: student.birthDate,
                    placeOfOrigin: student.placeOfOrigin,
                    classRoomId: student.classRoomId,
                    ...studentLessons
                };
            });

            //attendence

            return res.status(200).json({
                status: 200,
                message: "done",
                data: {
                    attdence: studentLessonArray,
                    lesson: lessonHeader.concat(sortedLessons) 
                }
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async reportAttendenceTeacher(req, res, next) {
        try {
            const attdences = await TeacherAttendenceService.report(req.body.teacherId, req.body.indexDate)
            if (!attdences) {

                return next(createError.BadRequest(`Không tìm được Driver`));
            }
            const rs = attdences.map((item) => {
                return {
                    teacherAttendanceId: item?.teacherAttendanceId ?? generateId(),
                    lessonName: item?.ScheduleItem?.Lesson?.lessonName ?? "",
                    classRoomName: item?.ScheduleItem?.Schedule?.ClassRoom?.classRoomName ?? "",
                    lessonStart: item?.ScheduleItem?.Lesson?.timeStart ?? "",
                    lessonEnd: item?.ScheduleItem?.Lesson?.timeEnd ?? "",
                    attendenceStatus: item?.attendenceStatus ?? "",
                    checkinTime: item?.checkinTime ?? " - ",
                    checkoutTime: item?.checkoutTime ?? " - ",

                }
            })
            const sortRS = rs.sort((a, b) => {
                const timeA = a.lessonStart.split(":");
                const timeB = b.lessonStart.split(":");
                return parseInt(timeA[0]) * 60 + parseInt(timeA[1]) - (parseInt(timeB[0]) * 60 + parseInt(timeB[1]));
            });
            return res.status(200).json({
                status: 200,
                message: "done",
                data: sortRS
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
}

module.exports = ReportAttendenceController;
