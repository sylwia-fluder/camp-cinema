import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import shortid from 'shortid';
import { ENDPOINTS } from "../constants";
import { headersWithToken } from "../helpers";
import Loading from "../components/Loading";
import MenuUser from "../components/MenuUser";
import Ticket from "../components/Ticket";

const MyTickets = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showTickets, setShowTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = () => {
        setShowLoader(true);

        fetch(
            ENDPOINTS.MY_TICKETS,
            {
                method: 'GET',
                headers: headersWithToken(),
            }
        )
            .then(response => response.json())
            .then(data => {
                setShowLoader(false);
                setShowTickets(data.tickets);
            })
            .catch(() => {
                setShowLoader(false);
                toast.error('Something went wrong...');
            });
    };

    return (
        <MenuUser>
            {showLoader && <Loading fixed/>}
            {showTickets.length === 0 ?
                <div>You don't have tickets</div> :
                showTickets.map(ticket => <Ticket key={shortid} data={ticket}/>)
            }
        </MenuUser>
    );
};

export default MyTickets;