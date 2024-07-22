
import Updates from "./Updates";


export default async function page() {
    let trendingnews;

    try {
        const response = await fetch('https://www.onlinekhabar.com/wp-json/okapi/v2/trending-posts?limit=6');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        trendingnews = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }


    let recentnews;


    try {
        const response = await fetch('https://www.onlinekhabar.com/wp-json/okapi/v2/recent-news?limit=6');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        recentnews = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }


    return (
        <>

            <Updates trendingnews={trendingnews.data} recentnews={recentnews.data} />

        </>
    )





}