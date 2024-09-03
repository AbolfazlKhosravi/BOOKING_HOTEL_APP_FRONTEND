import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

const Header = () => {
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
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
          <div id="optionDropDown">1 adullt &bull; 2 children &bull; 1rome</div>
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
export default Header;
