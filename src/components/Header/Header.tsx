import React, { useRef, useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutSideCick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
interface OptionItemType {
  id: number;
  title: string;
}
interface OptionType {
  count: number;
  title: "Adult" | "Children" | "Room";
  minLimit: number;
}

type OptionsType = OptionType[];
interface GuestOptionListComponentType {
  options: OptionsType;
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
  setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionItemComponentType {
  title: string;
  options: OptionsType;
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
}
interface ChoseDateRangeType {
  date: Range;
  setDate: React.Dispatch<React.SetStateAction<Range>>;
  setOpenDateRange: React.Dispatch<React.SetStateAction<boolean>>;
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

interface QueryStrType {
  destination?: string;
  options?: {
    count: string | number;
    title: "Adult" | "Children" | "Room";
    minLimit: string | number;
  }[];
  date?: {
    startDate?: string | Date;
    endDate?: string | Date;
    key?: string;
  };
}

const initialaDate: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function Header() {
  const location = useLocation();
  const parseQueary: QueryStrType = qs.parse(location.search.split("?")[1]);

  const [destination, setDestination] = useState<string>(
    parseQueary.destination ? parseQueary.destination : ""
  );
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionsType>(
    parseQueary.options
      ? parseQueary.options.map((option): OptionType => {
          return {
            count: Number(option.count),
            title: option.title,
            minLimit: Number(option.minLimit),
          };
        })
      : optionsData
  );
  const [date, setDate] = useState<Range>(
    parseQueary.date
      ? {
          startDate: new Date(
            parseQueary.date?.startDate || new Date().toISOString()
          ),
          endDate: new Date(
            parseQueary.date?.endDate
              ? parseQueary.date?.endDate
              : new Date().toDateString()
          ),
          key: parseQueary.date.key,
        }
      : initialaDate
  );
  const navigate = useNavigate();

  const filterData: QueryStrType = {
    date,
    destination,
    options,
  };
  const queryStr: string = qs.stringify(filterData);

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          {location.pathname === "/"
            ? "Hoom"
            : location.pathname === "/hotels"
            ? "Hotels"
            : ""}
          <span className="seperator"></span>
        </div>
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
          <div
            onClick={() => setOpenDateRange((prev) => !prev)}
            className="dateDropDown"
            id="dateDropDown"
          >
            {`${format(date.startDate ?? new Date(), "dd-MMM-yyy")} to ${format(
              date.endDate ?? new Date(),
              "dd-MMM-yyy"
            )}`}
          </div>
          {openDateRange && (
            <ChoseDateRange
              setOpenDateRange={setOpenDateRange}
              date={date}
              setDate={setDate}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.map((option, index) => (
              <span id="optionDropDown" key={option.title}>
                {option.count} {option.title}
                {options.length !== index + 1 ? <span> &bull; </span> : ""}
              </span>
            ))}
          </div>
          {openOptions && (
            <GuestOptionList
              options={options}
              setOptions={setOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button
            className="headerSearchBtn"
            onClick={() =>
              navigate({
                pathname: "/hotels",
                search: queryStr,
              })
            }
          >
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

const ChoseDateRange = ({
  date,
  setOpenDateRange,
  setDate,
}: ChoseDateRangeType) => {
  const dateRangeRef = useRef<HTMLDivElement>(null);
  useOutSideCick(dateRangeRef, "dateDropDown", () => setOpenDateRange(false));
  return (
    <div ref={dateRangeRef}>
      <DateRange
        className="date"
        ranges={[date]}
        onChange={(item: RangeKeyDict) => setDate(item.selection)}
        moveRangeOnFirstSelection={true}
        minDate={new Date()}
      />
    </div>
  );
};

const GuestOptionList = ({
  options,
  setOptions,
  setOpenOptions,
}: GuestOptionListComponentType) => {
  const optionListRef = useRef<HTMLDivElement>(null);
  useOutSideCick(optionListRef, "optionDropDown", () =>
    setOpenOptions((prevData) => !prevData)
  );
  return (
    <div className="guestOptions" ref={optionListRef}>
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
