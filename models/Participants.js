const { Schema, model } = require('mongoose');

const ParticipantsSchema = new Schema({
  Nama: {
    type: String,
    required: true
  },
  Code : {
    type: String,
  },
  Email: {
    type: String
  },
  HP : {
    type: String
  },
  Perusahaan: {
    type: String,
  },
  Alamat_Perusahaan: {
    type: String
  },
  Jabatan: {
    type: String
  },
  Role: {
    type: String,
  },
  Ukuran_Baju: {
    type: String
  },
  IsRegist: {
    type: Boolean
  }
},
{
  timestamps: true,
}
);

module.exports = Participant = model('pesertas', ParticipantsSchema, "peserta");
