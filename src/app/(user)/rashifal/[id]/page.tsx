import { error } from "console";
import Link from "next/link";
import SingleRashifal from "./SingleRahifal";

const RashifalSingle = async ({ params }) => {

  let rashifaldata;
  const rashifalapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashifal/${params.id}`;

  try {
    const response = await fetch(rashifalapi, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    rashifaldata = await response.json();
  }
  catch (error) {
    console.error("error", error);
    return <div>error fetching. please try again</div>
  };

  const singleData = rashifaldata?.data?.rashi


  let rashifal;
  const rashiapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashi`;

  try {
    const response = await fetch(rashiapi, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    rashifal = await response.json();
  }
  catch (error) {
    console.error("error", error);
    return <div>error fetching. please try again</div>
  };
  const rashifalData = rashifal?.data?.rashi
  return (
    <>
      <SingleRashifal singleData={singleData} params={params} rashifalData={rashifalData} />
    </>
  );
};

export default RashifalSingle;