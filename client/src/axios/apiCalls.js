import axios from "../config/axiosConfig";

const getData = async (url, params) => {
  const res = await axios
    .get(
      url,
      {
      params
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((data) => {
      // console.log(data);
      return data;
    })
    .then((err) => {
      return err;
    });

  return await res;
};

export { getData };
