type Table = {
  id: string;
  table_name: string;
  seats: number;
  priority: number;
};

type ReservationRequest = {
  partySize: number;
  startTime: Date;
  durationMinutes: number;
};


export function findBestTable(
  request: ReservationRequest,
  tables: Table[],
  existingReservations: any[]
) {

  const availableTables = tables.filter((table) => {

    if (table.seats < request.partySize) {
      return false;
    }


    const conflict = existingReservations.some((reservation)=>{

      if(reservation.table_id !== table.id){
        return false;
      }


      const existingStart =
        new Date(reservation.reservation_time);


      const existingEnd =
        new Date(
          existingStart.getTime() +
          reservation.duration_minutes * 60000
        );


      const requestedEnd =
        new Date(
          request.startTime.getTime() +
          request.durationMinutes * 60000
        );


      return (
        request.startTime < existingEnd &&
        requestedEnd > existingStart
      );

    });


    return !conflict;

  });


  availableTables.sort((a,b)=>{

    const wastedSeatsA =
      a.seats - request.partySize;

    const wastedSeatsB =
      b.seats - request.partySize;


    if(wastedSeatsA !== wastedSeatsB){
      return wastedSeatsA - wastedSeatsB;
    }


    return a.priority - b.priority;

  });


  return availableTables[0] || null;

}
