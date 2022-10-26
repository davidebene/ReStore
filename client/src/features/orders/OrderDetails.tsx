import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

export default function OrderDetails() {
    const {id} = useParams<{id: string}>();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<Order>();
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        agent.Orders.fetch(parseInt(id!))
            .then(order => setOrder(order))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        if(order) {
            setSubtotal(order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0);
        }
    }, [id, order])

    if(loading) return <LoadingComponent message="Loading order..."/>

    return (
        <>
            <BasketTable items={order?.orderItems as BasketItem[]} isBasket={false}/>    
            <Grid container>
               <Grid item xs={6} />
               <Grid item xs={6}>
                  <BasketSummary subtotal={subtotal}/>
                </Grid>  
            </Grid>
        </>
    )
}