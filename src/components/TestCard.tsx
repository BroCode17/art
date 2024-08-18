import React from "react";

const TestCard = () => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-soft">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-black rounded-xl">{/* Image */}</div>

        <div className="mt-2">
          <h1 className="font-bold text-md">Bro Code</h1>
          <p className="m-0 p-0 text-sm">Art Lover</p>
        </div>
      </div>
      <div className="font-light text-xs">
        <p>
          &quot;Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar
          ultricies, purus dolor sit amet, consectetuer adipiscing elit&quot;
        </p>
      </div>
      <div>
        {/* Date */}
        <p className="font-light text-xs">15 June, 2024</p>
      </div>
    </div>
  );
};

export default TestCard;
