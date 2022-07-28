const { Shema, model, Schema } = require("mongoose");

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "hospitals" }
);

HospitalSchema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospitalSchema);
