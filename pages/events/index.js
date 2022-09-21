import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;
  function findEventsHandler(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }

  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="events here" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}
