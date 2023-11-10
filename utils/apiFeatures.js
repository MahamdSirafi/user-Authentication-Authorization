class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // console.log(this.queryString);
    const queryObj = { ...this.queryString };
    let search;
    if (queryObj.search) {
      search = queryObj.search;
    }
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "agg",
      "aggDate",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // console.log(typeof queryStr, queryStr);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );
    // Add search condition
    if (search) {
      queryStr = JSON.stringify({
        $and: [JSON.parse(queryStr), { $text: { $search: search } }],
      });
    }
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      // console.log("limitFields : ", fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  agg() {
    if (this.queryString.agg) {
      this.queryString.agg = this.queryString.agg.replaceAll("=", ":");
      this.queryString.agg = this.queryString.agg.replace(
        /(\[[a-zA-Z,]+\]|[a-zA-z.]+)/g,
        (match) => `"${match}"`
      );
      let objAgg = {};
      // console.log(this.queryString.agg);
      Object.assign(objAgg, JSON.parse(this.queryString.agg));
      // console.log(objAgg);
      // console.log(objAgg.group);
      let group = [...objAgg.group];
      group.pop();
      group.shift();
      group = group.join("").split(",");
      // console.log(typeof group, group);
      group.forEach((item, index) => {
        group[index] = `$${item}`;
      });
      this.query = this.query.aggregate([
        {
          $group: {
            _id: group,
            max: { $max: `$${objAgg.max}` },
            min: { $min: `$${objAgg.min}` },
            avg: { $avg: `$${objAgg.avg}` },
            total: { $sum: `$${objAgg.sum}` },
            count: { $sum: 1 },
          },
        },
      ]);
    }
    return this;
  }
  aggDate() {
    if (this.queryString.aggDate) {
      this.queryString.aggDate = this.queryString.aggDate.replaceAll("=", ":");
      this.queryString.aggDate = this.queryString.aggDate.replace(
        /(\[[a-zA-Z,]+\]|[a-zA-z.]+)/g,
        (match) => `"${match}"`
      );
      let objAgg = {};
      // console.log(this.queryString.aggDate);
      Object.assign(objAgg, JSON.parse(this.queryString.aggDate));
      // console.log(objAgg);
      // console.log(objAgg.group);
      let group = [...objAgg.group];
      group.pop();
      group.shift();
      group = group.join("").split(",");
      // console.log(typeof group, group);
      group.forEach((item, index) => {
        group[index] = `$${item}`;
      });
      let maxyear = objAgg.year || 3000;
      let minyear = objAgg.year || 1970;
      let data = {
        group: group[0],
        max: objAgg.max,
        min: objAgg.min,
        avg: objAgg.avg,
        sum: objAgg.sum,
        minyear: minyear,
        maxyear: maxyear,
      };
      switch (objAgg.date) {
        case "date": {
          this.query = this.aggregate(data, "$date");
          break;
        }
        case "year": {
          this.query = this.aggregate(data, "$year");
          break;
        }
        case "month": {
          this.query = this.aggregate(data, {
            year: "$year",
            month: "$month",
          });
          break;
        }
        default: {
          this.query = this.aggregate(data, {
            year: "$year",
            month: "$month",
            day: "$day",
          });
        }
      }
    }
    return this;
  }
  aggregate(data, objId) {
    return this.query.aggregate([
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: data.group },
          },
          year: { $year: data.group },
          month: { $month: data.group },
          day: { $dayOfMonth: data.group },
          [data.max]: 1,
          [data.min]: 1,
          [data.avg]: 1,
          [data.sum]: 1,
        },
      },
      {
        $match: {
          year: { $gte: data.minyear, $lte: data.maxyear },
        },
      },
      {
        $group: {
          _id: objId,
          max: { $max: `$${data.max}` },
          min: { $min: `$${data.min}` },
          avg: { $avg: `$${data.avg}` },
          total: { $sum: `$${data.sum}` },
          count: { $sum: 1 },
        },
      },
    ]);
  }
}
module.exports = APIFeatures;
