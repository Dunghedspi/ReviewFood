const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
export const handleComment = (data) => {
  const groupRate = groupBy(data, "rate");
  let result = {
    "1": {
      vote: 0,
      color: "#F78651",
    },
    "2": {
      vote: 0,
      color: "#FCAF46",
    },
    "3": {
      vote: 0,
      color: "#FFD74B",
    },
    "4": {
      vote: 0,
      color: "#ACD687",
    },
    "5": {
      vote: 0,
      color: "#6DC7A1",
    },
  };
  for (const key in groupRate) {
    if (Object.hasOwnProperty.call(groupRate, key)) {
      const element = groupRate[key];
      result[key].vote = (element.length / data.length) * 100;
    }
  }
  return result;
};

export const checkLike = (likes, user_id) => {
  const id = likes.findIndex((item) => item.userId === user_id);
  return id !== -1;
};
