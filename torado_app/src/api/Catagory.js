import {
  FaToolbox,
  FaBolt,
  FaCogs,
  FaGasPump,
  FaDrumSteelpan,
  FaWrench,
} from "react-icons/fa";
import { GiDrill } from "react-icons/gi";

const categories = [
  { title: "Mason's Level", items: 5, icon: GiDrill },
  { title: "Bull’s Eye Level", items: 25, icon: FaToolbox },
  { title: "Drill Drivers", items: 9, icon: FaBolt },
  { title: "Compact", items: 9, icon: FaCogs },
  { title: "Gasoline Generators", items: 8, icon: FaGasPump },
  { title: "Hammer Drills", items: 13, icon: FaDrumSteelpan },
  { title: "Grind Tools", items: 12, icon: FaWrench },
];

export default categories;
