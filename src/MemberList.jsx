import { alert } from "@material-tailwind/react";
import { useState } from "react";

export default function MemberList({ tableRows }) {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const handleUpdate = () => {
    // Find the index of the currently edited member in the tableRows array
    const index = tableRows.findIndex((row) => row.name === editingMember.name);

    if (index !== -1) {
      // Create a new member object with the edited data
      const updatedMember = {
        ...tableRows[index], // Copy existing member data
        name: editingMember.name, // Update name
        job: editingMember.job, // Update job
        date: editingMember.date, // Update date
      };

      // Update the specific member in the tableRows array
      const updatedRows = [...tableRows];
      updatedRows[index] = updatedMember;

      // Save the updated data to localStorage
      localStorage.setItem("tableRows", JSON.stringify(updatedRows));

      // Update the table rows with the new data
      //setTableRows(updatedRows);
    }

    // Close the modal window
    setShowModal(false);
    window.location.reload(false);
  };

  const handleDelete = () => {
    // Megkeressük az aktuálisan szerkesztett tag indexét a tableRows tömbben
    const index = tableRows.findIndex(
      (row) =>
        row.name === editingMember.name &&
        row.job === editingMember.job &&
        row.date === editingMember.date
    );

    if (index !== -1) {
      // Töröljük az adott tagot a tableRows tömbből
      const updatedTableRows = [...tableRows];
      updatedTableRows.splice(index, 1);

      // Mentjük az új adatokat a localStorage-ba
      localStorage.setItem("tableRows", JSON.stringify(updatedTableRows));

      // Frissítjük a táblázatot, hogy a változások érvényesüljenek

      //setTableRows(updatedTableRows);
    }

    // Bezárjuk a modal ablakot
    setShowModal(false);
    window.location.reload(false);
    //console.log("row Deleted");
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Alkalmazot
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                e-mail
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                telefonszám
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ name, job, date }, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name} className={index % 2 === 0 ? "bg-gray-200" : ""}>
                  <td className={classes}>{name}</td>
                  <td className={classes}>{job}</td>
                  <td className={classes}>{date}</td>
                  <td className={classes}>
                    <button
                      className=""
                      type="button"
                      onClick={() => handleEdit({ name, job, date })}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && editingMember && (
        <div className="WHSize">
          <>
            <div className="text-center">
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-5/6 md:w-2/3 lg:w-1/2 my-6 mx-auto">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                    <div className="mx-auto mt-5">
                      <h3 className="text-3xl font-semibold text-center">
                        Szerkesztés
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="p-6 w-full max-w-64 mx-auto">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="text-lg font-medium text-gray-900"
                        >
                          Név
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={editingMember.name}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              name: e.target.value,
                            })
                          }
                          className="text-center w-full max-w-64 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="job"
                          className="text-lg font-medium text-gray-900"
                        >
                          E-mail cím
                        </label>
                        <input
                          id="job"
                          type="text"
                          value={editingMember.job}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              job: e.target.value,
                            })
                          }
                          className="text-center w-full max-w-64 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="date"
                          className="text-lg font-medium text-gray-900"
                        >
                          Telefonszám
                        </label>
                        <input
                          id="date"
                          type="text"
                          value={editingMember.date}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              date: e.target.value,
                            })
                          }
                          className="text-center w-full max-w-64 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-red-500 text-white active:bg-red-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={handleDelete}
                      >
                        Törlés
                      </button>
                      <div>
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModal(false),
                              alert("Ez a tag kilesz törölve!");
                          }}
                        >
                          Bezár
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleUpdate}
                        >
                          Mentés
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        </div>
      )}
    </div>
  );
}
