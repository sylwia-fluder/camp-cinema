const {Screening} = require('../models/Screening');
const {Seat} =  require('../models/Seat');

function getScreeningRoom(){
  const screeningRoom=[];
  for( let r=1; r<=9; r++) {
    for( let num=1; num<=14; num++) {
      screeningRoom.push(new Seat({
        row: r,
        seatNumber:num,
      }));
    }
  }
  return screeningRoom;
}

function checkSeatStatus(place){
  return place.status !=='available';
}

async function seatUpdateAsReserved(res, id, row, num){
  
  try {
    const screening = await Screening.findById(id);

    const placeIndex = screening.screeningRoom.findIndex((place) => place.row === row && place.seatNumber === num);
    

    if(placeIndex>-1){
      const isAvailable = checkSeatStatus(screening.screeningRoom[placeIndex]);
      if(!isAvailable) return res.status(400).send('seat is already reserved');

      screening.screeningRoom[placeIndex].status='reservation';

      screening.markModified('screeningRoom');

      await screening.save();

      return res.send(screening.screeningRoom[placeIndex]);
    }
    else{
      return res.status(400).send('place not found');
    }
  } catch(error){
    return res.status(404).send(error.message);
  }
  
}


exports.getScreeningRoom = getScreeningRoom;
exports.seatUpdateAsReserved = seatUpdateAsReserved;
exports.checkSeatStatus = checkSeatStatus;