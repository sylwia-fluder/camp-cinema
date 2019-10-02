const {Screening} = require('../models/Screening');

function getScreeningRoom(){
  const screeningRoom=[];
  for( let r=1; r<=9; r++) {
    for( let num=1; num<=14; num++) {
      screeningRoom.push({
        row: r,
        seatNumber:num,
        status: 'available'
      });
    }
  }
  return screeningRoom;
}

async function seatUpdateAsReserved(res, id, row, num){

  try {
    await Screening.updateOne(
      { '_id': id, 'screeningRoom.row':row, 'screeningRoom.seatNumber':num }, 
      { '$set': { 'screeningRoom.$.status': 'reserved' } }
    );
  } catch(error){
    return res.status(404).send(error.message);
  }
  
  return Screening.findById(id);
}

exports.getScreeningRoom = getScreeningRoom;
exports.seatUpdateAsReserved = seatUpdateAsReserved;