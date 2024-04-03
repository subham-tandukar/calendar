import React from 'react';
import Eventsblog from './Eventsblog';

export default async function Page() {
    let data;

    try {
        const response = await fetch('https://www.onlinekhabar.com/wp-json/okapi/v2/trending-posts?limit=6&time_limit=3%20years%20ago');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <>
         <Eventsblog data={data.data} />
        </>
    );
}
