import {useRouter} from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

export default function EventDetailPage(){
    const router = useRouter();
    const eventId = router.query.eventId;
    const eDetail = getEventById(eventId);
    if (!eDetail) {
        return <p>Not found Event</p>;
    }
    return <Fragment>
                <EventSummary title={eDetail.title} />
                <EventLogistics date={eDetail.date} address={eDetail.location} image={eDetail.image} imageAlt={eDetail.title} />
                <EventContent>
                    <p>{eDetail.description}</p>
                </EventContent>
            </Fragment>;
}