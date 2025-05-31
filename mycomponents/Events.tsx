import React from "react";

type Props = {
   events: string[]
};

function Events({ events }: Props) {
  return (
    <ul>
      {events.map((event, index) => {
        return <li key={index}>{event}</li>;
      })}
    </ul>
  );
}

export default Events;
