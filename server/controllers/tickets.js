const {User} = require('../models/User'); 

async function sentTicketToUserDate(id, ticket){
  const user = await User.findByIdAndUpdate(
    id, {
      $push: { tickets: {
        '_id': ticket._id,
        'screening': ticket.screening,
        'place': ticket.place
      }}},
    { new: true }
  );
    
  return user;
}

exports.sentTicketToUserDate = sentTicketToUserDate;