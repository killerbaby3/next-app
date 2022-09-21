import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
// export async function getServerSideProps(context){
//     const { params } = context;
//     const filterData = params.slug;
//     const nYear = +filterData[0];
//     const nMonth = +filterData[1];

//     if (isNaN(nYear) || isNaN(nMonth) || nYear > 2030 || nYear < 2021 || nMonth < 1 || nMonth > 12) {
//         return {
//             props : {
//                 hasError : true
//             }
//         };
//     }

//     const filteredEvents = await getFilteredEvents({year:nYear,month:nMonth});

//     return {
//         props : {
//             filteredEvents : filteredEvents,
//             date : {
//                 nYear : nYear,
//                 nMonth : nMonth
//             }
//         }
//     }
// }

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const route = useRouter();
  const filterData = route.query.slug;
  const { data, error } = useSWR(
    "https://nextjs-course-83c09-default-rtdb.firebaseio.com/events.json"
  );
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="List of filterd Events" />
    </Head>
  );

  if (!loadedEvents) {
    return (
        <Fragment>
            {pageHeadData}
            <p className="center">Loading ...</p>
        </Fragment>
    );
  }

  const nYear = +filterData[0];
  const nMonth = +filterData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events - {`${nMonth + "/" + nYear}`}</title>
      <meta
        name="description"
        content={`All events for ${nMonth + "/" + nYear}.`}
      />
    </Head>
  );

  if (
    isNaN(nYear) ||
    isNaN(nMonth) ||
    nYear > 2030 ||
    nYear < 2021 ||
    nMonth < 1 ||
    nMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid params</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === nYear && eventDate.getMonth() === nMonth - 1
    );
  });

  if (filteredEvents.length == 0 || !filteredEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Not found Events</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(nYear, nMonth);
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
