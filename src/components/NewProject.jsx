import { useRef } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";


export default function NewProject({ onAdd }) {

    const modal = useRef();
    const title = useRef();

    const description = useRef();

    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        // Adding validation... 
        if (enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === ''
        ) {

            modal.current.open();
            return;// terminate the execution if we have invlid input and below bock will not execute.
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })// this object will pass to App as an argument to handleAddProject bcz we will now set handleAddProject
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okey">
                <h2>Invalid Input</h2>
                <p>Opps... Looks like you forgot ti enter value</p>
                <p>Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end
        gap-4 my-4">
                    <li>
                        <button className="text-stone-500 hover:text-stone-900">Cancel</button>
                    </li>
                    <li>
                        <button className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50
                 hover:bg-stone-950"
                            onClick={handleSave}>
                            Save
                        </button>
                    </li>

                </menu>
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input ref={description} label="Description" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />
                </div>
            </div>
        </>
    );
}