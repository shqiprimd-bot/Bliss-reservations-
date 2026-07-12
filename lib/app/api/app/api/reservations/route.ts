import { supabase } from "@/lib/supabase";
import { findBestTable } from "@/lib/assignment";


export async function POST(request: Request) {

  const body = await request.json();

  const {
    name,
    phone,
    email,
    partySize,
    reservationTime,
    notes
  } = body;


  const { data: restaurant } =
    await supabase
      .from("restaurants")
      .select("*")
      .eq("name","Bliss Caffeine Bar")
      .single();


  if(!restaurant){
    return Response.json(
      {error:"Restaurant not found"},
      {status:400}
    );
  }


  const { data: tables } =
    await supabase
      .from("restaurant_tables")
      .select("*")
      .eq("restaurant_id",restaurant.id)
      .eq("active",true);



  const { data: reservations } =
    await supabase
      .from("reservations")
      .select("*")
      .eq("restaurant_id",restaurant.id)
      .eq("status","confirmed");



  const table = findBestTable(
    {
      partySize,
      startTime:new Date(reservationTime),
      durationMinutes:
        restaurant.default_turn_minutes
    },
    tables || [],
    reservations || []
  );


  if(!table){

    return Response.json(
      {
        error:
        "No tables available for this time"
      },
      {
        status:400
      }
    );

  }



  const { data, error } =
    await supabase
      .from("reservations")
      .insert({

        restaurant_id:restaurant.id,

        table_id:table.id,

        guest_name:name,

        phone,

        email,

        party_size:partySize,

        reservation_time:
          reservationTime,

        duration_minutes:
          restaurant.default_turn_minutes,

        notes

      })
      .select()
      .single();



  if(error){

    return Response.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }


  return Response.json({

    reservation:data,

    assignedTable:
      table.table_name

  });


}
