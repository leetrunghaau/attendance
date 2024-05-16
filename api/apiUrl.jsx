export const BASE_URL = "http://localhost:4000"; //LOCAL
// export const BASE_URL = "http://14.187.134.182:8080"; //LOCAL

export const URL_API = {
  LOGIN: {
    GET_TOKEN: BASE_URL + "/api/Authenticate/getToken",
  },
  CLASS_ROOM:{
    GET: BASE_URL+"/api/classRoom/",
    GETS: BASE_URL+"/api/classRooms",
    CREATE: BASE_URL+"/api/classRoom",
    UPDATE: BASE_URL+"/api/classRoom",
    DELETE: BASE_URL+"/api/classRoom/",
  },
  DRIVER:{
    GET: BASE_URL+"/api/driver/",
    GETS: BASE_URL+"/api/drivers",
    CREATE: BASE_URL+"/api/driver",
    UPDATE: BASE_URL+"/api/driver",
    DELETE: BASE_URL+"/api/driver/",
  },
  LESSON:{
    GET: BASE_URL+"/api/lesson/",
    GETS: BASE_URL+"/api/lessons",
    CREATE: BASE_URL+"/api/lesson",
    UPDATE: BASE_URL+"/api/lesson",
    DELETE: BASE_URL+"/api/lesson/",
  },
  STUDENT:{
    GET: BASE_URL+"/api/student/",
    GETS: BASE_URL+"/api/students/classRoomId/",
    CREATE: BASE_URL+"/api/student",
    UPDATE: BASE_URL+"/api/student",
    DELETE: BASE_URL+"/api/student/",
  },
  TEACHER:{
    GET: BASE_URL+"/api/teacher/",
    GETS: BASE_URL+"/api/teachers",
    CREATE: BASE_URL+"/api/teacher",
    UPDATE: BASE_URL+"/api/teacher",
    DELETE: BASE_URL+"/api/teacher/",
  },
  SCHEDULE:{
    GET: BASE_URL+"/api/schedule/",
    GETS: BASE_URL+"/api/schedules",
    GETS_CLASS_ROOM: BASE_URL+"/api/schedules/classRoomId/",
    CREATE: BASE_URL+"/api/schedule",
    UPDATE: BASE_URL+"/api/schedule",
    DELETE: BASE_URL+"/api/schedule/",
  },
  SCHEDULE_ITEM:{
    GET: BASE_URL+"/api/scheduleItem/",
    GETS: BASE_URL+"/api/scheduleItems",
    GETS_SCHEDULE: BASE_URL+"/api/scheduleItems/scheduleId/",
    CREATE: BASE_URL+"/api/scheduleItem",
    UPDATE: BASE_URL+"/api/scheduleItem",
    DELETE: BASE_URL+"/api/scheduleItem/",
  },
  ATTENDENCE:{
    STUDENT: BASE_URL+"/api/reportAttendenceStudent",
    TEACCHER: BASE_URL+"/api/reportAttendenceTeacher",
    
  },
  REPORT_IMG:{
    GETS: BASE_URL + "/api/imgLinks/"
  }

    
};
