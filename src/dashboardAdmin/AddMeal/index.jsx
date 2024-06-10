import SectionHeader from "../../comps/SectionHeader";
import { dashboardBodyClass } from "../index";
import AddForm from "./AddForm";

function AddMeal() {
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Add Meal'} />
      <AddForm />
    </div>
  );
}

export default AddMeal;