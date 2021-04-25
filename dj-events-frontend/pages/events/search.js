import Layout from '@/components/Layout';
import Link from 'next/link';
import {useRouter} from 'next/router';
import EventItem from '@/components/EventItem';
import {API_URL} from '@/config/index';
import qs from 'qs';

// EVENTS INDEX

export default function SearchPage({events}) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
        <Link href='/events'>Go Back</Link>
        <h1>Search Results for {router.query.term}</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      
    </Layout>
  )
}

//use get server side props when you dont know the exact url - i.e. with user provided query. getStaticPaths can be used for 'known' absolute urls

// this is how to search multiple db columns

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
      _where: {
          _or: [
              {name_contains: term},
              {performers_contains: term},
              {description_contains: term},
              {venue_contains: term},
          ]
      }
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()
  return {
    props: {events}

  }
};