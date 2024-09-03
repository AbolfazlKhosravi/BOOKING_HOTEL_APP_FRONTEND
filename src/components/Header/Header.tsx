import React, { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
interface OptionItemType {
  id: number;
  title: string;
}
interface OptionType {
  count: number;
  title: string;
  minLimit: number;
}

type OptionsType = OptionType[];
interface GuestOptionListComponentType {
  options: OptionsType;
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
}

interface OptionItemComponentType extends GuestOptionListComponentType {
  title: string;
}

type GuestOptionListType = OptionItemType[];

const guestOptionList: GuestOptionListType = [
  { id: 1, title: "Adult" },
  { id: 2, title: "Children" },
  { id: 3, title: "Room" },
];

const optionsData: OptionsType = [
  {
    count: 1,
    title: "Adult",
    minLimit: 1,
  },
  { count: 0, title: "Children", minLimit: 0 },
  { count: 1, title: "Room", minLimit: 0 },
];

function Header() {
  const [destination, setDestination] = useState<string>("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionsType>(optionsData);
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDestination(e.target.value)
            }
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2024/3/9</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.map((option, index) => (
              <span key={option.title}>
                {option.count} {option.title}
                {options.length !== index + 1 ? <span> &bull; </span> : ""}
              </span>
            ))}
          </div>
          {openOptions && (
            <GuestOptionList options={options} setOptions={setOptions} />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

const GuestOptionList = ({
  options,
  setOptions,
}: GuestOptionListComponentType) => {
  return (
    <div className="guestOptions">
      {guestOptionList.map((optionItem) => (
        <OptionItem
          key={optionItem.id}
          title={optionItem.title}
          options={options}
          setOptions={setOptions}
        />
      ))}
    </div>
  );
};

const OptionItem = ({
  title,
  options,
  setOptions,
}: OptionItemComponentType) => {
  const option = options.find((optionItem) => optionItem.title === title);
  if (!option) return;

  const handleOptions = (operation: "inc" | "dec") => {
    setOptions((prevOptions) =>
      prevOptions.map((prevOption) =>
        prevOption.title === title
          ? {
              ...prevOption,
              count:
                operation === "dec"
                  ? prevOption.count - 1
                  : prevOption.count + 1,
            }
          : prevOption
      )
    );
  };
  return (
    <div className="guestOptionItem">
      <span className="optionText">{title}</span>
      <div className="optionCounter">
        <button
          disabled={option?.count <= option?.minLimit}
          className="optionCounterBtn"
          onClick={() => handleOptions("dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option?.count}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions("inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;