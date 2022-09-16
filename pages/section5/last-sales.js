import { useEffect, useState } from "react";
import useSWR from 'swr';

export async function getStaticProps(){
    const res = await fetch('https://nextjs-course-83c09-default-rtdb.firebaseio.com/sales.json');
    const data = await res.json();
    const arrSales = [];
    for (const k in data) {
        arrSales.push({id : k,username:data[k].username,volume:data[k].volume});
    }
    return { props : { sales : arrSales } };
}

export default function LastSalesPage(props){
    const [sales,setSales] = useState(props.sales);
    const url = 'https://nextjs-course-83c09-default-rtdb.firebaseio.com/sales.json';
    const { data, error } = useSWR(
        url
    );
    useEffect(() => {
        if (data) {
            const arrSales = [];
            for (const k in data) {
                arrSales.push({id : k,username:data[k].username,volume:data[k].volume});
            }  
            setSales(arrSales); 
        }
    },[data]);

    if (error) {
        return <p>Failed !</p>
    }

    if (!data && !sales) {
        return <p>Loading ....</p>
    }
    return <ul>
        {sales.map(s => (<li key={s.id}>{s.username} - ${s.volume}</li>))}
    </ul>;
}