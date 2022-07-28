const { Shema, model, Schema, SchemaType } = require("mongoose");

const DoctorSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { collection: "doctors" }
);

DoctorSchema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();
  return object;
});

module.exports = model("Doctor", DoctorSchema);
