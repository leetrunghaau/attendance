function getCurDateForSelectUi() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = currentDate.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
}
function isScheduleValid(newSchedule, existingSchedules) {
    if (new Date(newSchedule.startDate) >= new Date(newSchedule.endDate)) {
        console.error("Ngày kết thúc phải sau ngày bắt đầu.");
        return {value: false, message:"Ngày kết thúc phải sau ngày bắt đầu."};
    }
    for (const schedule of existingSchedules) {
        if (
            (new Date(newSchedule.startDate) >= new Date(schedule.startDate) && 
            new Date(newSchedule.startDate) <= new Date(schedule.endDate)) ||
            (new Date(newSchedule.endDate) >= new Date(schedule.startDate) &&
            new Date(newSchedule.endDate) <= new Date(schedule.endDate))
        ) {
            console.error("Thời khóa biểu mới trùng lặp với thời khóa biểu hiện có.");
            return {value: false, message:"Thời gian hiện tại trùng với thì gian đã có"};
        }
    }
    return  {value: true, message:"Thời gian hợp lệ"};
}
module.exports = { 
    getCurDateForSelectUi,
    isScheduleValid

 };