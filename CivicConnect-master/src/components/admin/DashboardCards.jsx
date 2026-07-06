export default function DashboardCards() {

    const cards = [

        {
            title:"Total Complaints",
            value:0
        },

        {
            title:"Pending",
            value:0
        },

        {
            title:"Resolved",
            value:0
        },

        {
            title:"Users",
            value:0
        }

    ];

    return(

        <div className="grid grid-cols-4 gap-6">

            {cards.map(card=>(
                <div
                key={card.title}
                className="bg-slate-800 rounded-xl p-6 text-white shadow-lg"
                >

                    <p className="text-gray-400">
                        {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-4">
                        {card.value}
                    </h2>

                </div>
            ))}

        </div>

    );

}