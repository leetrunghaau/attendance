import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";


export const getSchedule = async (inputParam) => {
    try {
      return await getProvider(
        URL_API.SCHEDULE.GET + inputParam,
        null,
        null
      ).then(async (response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
export const getListSchedule = async () => {
  try {
    return await getProvider(
      URL_API.SCHEDULE.GETS,
      null,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getListScheduleByClassRoom = async (inputParam) => {
    try {
      return await getProvider(
        URL_API.SCHEDULE.GETS_CLASS_ROOM + inputParam,
        null,
        null
      ).then(async (response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
export const updateSchedule = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.SCHEDULE.UPDATE,
      inputParam,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createSchedule = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.SCHEDULE.CREATE,
      inputParam,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteSchedule = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.SCHEDULE.DELETE + inputParam,
      null,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};