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

function checkSeatStatus(place){
  return place.status ==='available';
}

async function seatUpdateAsReserved(res, id, row, num){
  
  try {
    const isAvailable = await checkSeatStatus(id,row,num);
    if(!isAvailable) return res.status(400).send('seat is already reserved');

    await Screening.updateOne(
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