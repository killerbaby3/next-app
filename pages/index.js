import EventList from "../components/events/event-list";
import Head from 'next/head';
import { getFeaturedEvents } from "../helpers/api-util";
export async function getStaticProps(){
    const featuredEvents = await getFeaturedEvents();
    return {
        props : {
            events : featuredEvents
        },
        revalidate : 1800
    };
}

export default function HomePage(props){
    return <div>
        <Head>
            <title>Next Home</title>
            <meta name="description" content="home here" />
        </Head>
        {<EventList items={props.events} />}
    </div>;
}