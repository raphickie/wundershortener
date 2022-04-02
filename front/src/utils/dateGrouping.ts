import dayjs from "dayjs";
import _ from "lodash";

const groupByDay = (elements: Date[]): _.Dictionary<Date[]> => {
  return _.groupBy(elements, (el) => {
    return el.toString().substring(0, 19);
  });
};
export default groupByDay;
