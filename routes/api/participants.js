const express = require('express');
const router = express.Router();
require('dotenv').config();

const Participants = require('../../models/Participants');

//Get All Participants
router.get('/', async (req, res) => {
  try {
    const participant = await Participants.find({})
    
    if (participant.length < 1) {
      return res.json({msg: 'Belum ada partisipan'})
    }

    res.json(participant)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

//Add Participant
router.post('/', async (req, res) => {
  const { name, company, compAddress, email, hp, jabatan, role, size } = req.body;
  try {
    const participantExist = await Participants.findOne({email})

    if (participantExist) {
      return res.status(200).json(participantExist)
    }

    const newParticipant = await Participants.create({
      Nama : name,
      Code : Math.floor(Math.random()* (999999 - 100000) + 100000),
      Email : email,
      HP : hp,
      Perusahaan : company,
      Alamat_Perusahaan : compAddress,
      Jabatan : jabatan,
      Role : role,
      Ukuran_Baju : size,
      IsRegist : true
    })

    await newParticipant.save()

    res.status(201).json(newParticipant)

  } catch (err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
