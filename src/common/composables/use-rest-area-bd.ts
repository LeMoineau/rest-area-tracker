import RestArea from "../types/rest-area/RestArea";
import restAreas from "./../config/database/rest-area-db.json";

const useRestAreaBd = () => {
  return { restAreas: restAreas as RestArea[] };
};

export default useRestAreaBd;
