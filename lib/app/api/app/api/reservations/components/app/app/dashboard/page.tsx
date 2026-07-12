import { supabase } from "@/lib/supabase";


export default async function Dashboard(){

const { data: reservations } =
await supabase
.from("reservations")
.select(`
 *,
 restaurant_tables(
   table_name,
   seats
 )
`)
.order(
"reservation_time",
{
ascending:true
}
);



return (

<main className="p-8">

<h1 className="text-3xl font-bold mb-6">
Bliss Owner Dashboard
</h1>


<div className="grid gap-4">

{
reservations?.map((reservation)=>(

<div

key={reservation.id}

className="border rounded-lg p-5"

>

<h2 className="text-xl font-bold">

{reservation.guest_name}

</h2>


<p>
Party:
{reservation.party_size}
</p>


<p>
Table:
{
reservation.restaurant_tables
?.table_name
}

</p>


<p>
Time:
{
new Date(
reservation.reservation_time
)
.toLocaleString()
}

</p>


<p>
Status:
{
reservation.status
}

</p>


{
reservation.notes &&
<p>
Notes:
{reservation.notes}
</p>
}


</div>


))

}

</div>

</main>

);

}
