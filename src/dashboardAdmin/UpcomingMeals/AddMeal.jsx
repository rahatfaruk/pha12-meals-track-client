import Button from "../../comps/Button";
import AddForm from "./AddForm";

function AddMeal() {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <Button onClick={() => document.getElementById('my_modal_1').showModal()} className="md:text-lg py-2">Add Upcoming Meal</Button>
      </div>
      <Modal />
    </div>
  );
}

export default AddMeal;

function Modal() {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <AddForm />
      </div>
    </dialog>
  );
}


