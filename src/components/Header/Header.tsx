import React, { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

const Header = () => {
  const [destination, setDestination] = useState<string>("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
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
            1 adullt &bull; 2 children &bull; 1rome
          </div>
          {openOptions && <GuestOptionList />}
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
};

const GuestOptionList = () => {
  return (
    <div className="guestOptions">
      <OptionItem/>
    </div>
  );
};
const OptionItem = () => {
  return ( <div className="guestOptionItem">
    <span className="optionText">Adult</span>
    <div className="optionCounter">
      <button className="optionCounterBtn">
        <HiMinus className="icon" />
      </button>
      <span className="optionCounterNumber">2</span>
      <button className="optionCounterBtn">
        <HiPlus className="icon" />
      </button>
    </div>
  </div> );
}
 

export default Header;
