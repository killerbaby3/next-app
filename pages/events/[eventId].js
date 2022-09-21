import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Head from "next/head";
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eDetail = await getEventById(eventId);
  return {
    props: {
      eDetail: eDetail,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((e) => ({ params: { eventId: e.id } }));
  return {
    paths: paths,
    fallback: true, // 'blocking'
  };
}

export default function EventDetailPage(props) {
  const eDetail = props.eDetail;
  if (!eDetail) {
    return (
      <div className="center">
        <p>Loading....</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{eDetail.title}</title>
        <meta name="description" content={eDetail.description} />
      </Head>
      <EventSummary title={eDetail.title} />
      <EventLogistics
        date={eDetail.date}
        address={eDetail.location}
        image={eDetail.image}
        imageAlt={eDetail.title}
      />
      <EventContent>
        <p>{eDetail.description}</p>
      </EventContent>
    </Fragment>
  );
}
