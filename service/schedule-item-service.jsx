import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";


export const getScheduleItem = async (inputParam) => {
    try {
      return await getProvider(
        URL_API.SCHEDULE_ITEM.GET + inputParam,
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
export const getListScheduleItem = async () => {
  try {
    return await getProvider(
      URL_API.SCHEDULE_ITEM.GETS,
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
export const getListScheduleItemBySchedule = async (inputParam) => {
    try {
      return await getProvider(
        URL_API.SCHEDULE_ITEM.GETS_SCHEDULE + inputParam,
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
export const updateScheduleItem = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.SCHEDULE_ITEM.UPDATE,
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
export const createScheduleItem = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.SCHEDULE_ITEM.CREATE,
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
export const deleteScheduleItem = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.SCHEDULE_ITEM.DELETE + inputParam,
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