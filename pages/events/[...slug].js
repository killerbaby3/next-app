import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../dummy-data';
export default function FilteredEventsPage(){
    const router = useRouter();
    const filterData = router.query.slug;
    if (!filterData) {
        return <p className='center'>Loading...</p>;
    }
    
    const nYear = +filterData[0];
    const nMonth = +filterData[1];

    if (isNaN(nYear) || isNaN(nMonth) || nYear > 2030 || nYear < 2021 || nMonth < 1 || nMonth > 12) {
        return <>
                    <ErrorAlert>
                        <p>Invalid params</p>
                    </ErrorAlert>
                    <div className='center'>
                        <Button link='/events'>Show All Events</Button>
                    </div>
                </>
    }

    const filteredEvents = getFilteredEvents({year:nYear,month:nMonth});

    if (!filteredEvents || filteredEvents.length == 0) {
        return <>
                    <ErrorAlert>
                        <p>Not found Events</p>
                    </ErrorAlert>
                    <div className='center'>
                        <Button link='/events'>Show All Events</Button>
                    </div>
                </>
    }
    const date = new Date(nYear,nMonth - 1);
    return <>
                <ResultsTitle date={date} />
                <EventList items={filteredEvents} />
            </>;
}