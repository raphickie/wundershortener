import _ from "lodash";

const groupByDay = (elements: Date[]): _.Dictionary<Date[]> => {
  return _.groupBy(elements, (el) => {
    return new Date(el.toString().substring(0, 10));
  });
};
export default groupByDay;
