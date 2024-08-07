import Button from "../../comps/Button";
import Modal from "./Modal";

function AddMeal(props) {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <Button onClick={() => document.getElementById('my_modal_1').showModal()} className="md:text-lg py-2">Add Upcoming Meal</Button>
      </div>
      <Modal {...props} />
    </div>
  );
}

export default AddMeal;




