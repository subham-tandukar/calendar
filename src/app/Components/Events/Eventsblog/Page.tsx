import React from 'react';
import Eventsblog from './Eventsblog';

export default async function Page() {
    let data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/festive-articles`);
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
