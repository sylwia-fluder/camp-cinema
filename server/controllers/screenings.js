const {Screening} = require('../models/Screening');

function getScreeningRoom(){
  const screeningRoom=[];
  for( let r=1; r<=9; r++) {
    for( let num=1; num<=14; num++) {
      screeningRoom.push({
        rowNumber: r,
        seatNumber:num,
        status: 'available'
      });
    }
  }
  return screeningRoom;
}

async function checkSeatStatus(id,row,num){
  const screening = await Screening.findById(id);
  return screening.screeningRoom.find((place) => place.rowNumber===row&&place.seatNumber==num).status ==='available';
}

async function seatUpdateAsReserved(res, id, row, num){
  if(!(await checkSeatStatus(id,row,num))) return res.status(400).send('seat is already reserved');

  try {
    await Screening.update(
      { '_id': id, 'screeningRoom.rowNumber':row, 'screeningRoom.seatNumber':num},
      {'$set': { 'screeningRoom.$.status': 'reservation' } });
      
  } catch(error){
    return res.status(404).send(error.message);
  }
  
  return await Screening.findById(id);
}

exports.getScreeningRoom = getScreeningRoom;
exports.seatUpdateAsReserved = seatUpdateAsReserved;
exports.checkSeatStatus = checkSeatStatus;