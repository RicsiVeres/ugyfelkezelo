import React, { useState, useEffect } from "react";
import MemberList from "./MemberList.jsx";

export default function AddMember() {
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("tableRows");
    if (storedData) {
      setTableRows(JSON.parse(storedData));
    }
  }, []);

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("tableRows", JSON.stringify(data));
  };

  const Hozzaad = () => {
    const newName = document.querySelector("#nev").value;
    const newJob = document.querySelector("#email").value;
    const newDate = document.querySelector("#tel").value;
    const newTableRow = {
      name: newName,
      job: newJob,
      date: newDate,
    };

    const updatedRows = [...tableRows, newTableRow];
    setTableRows(updatedRows);
    saveDataToLocalStorage(updatedRows);

    document.querySelector("#nev").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#tel").value = "";

    return newTableRow;
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
          onClick={openModal}
        >
          Új tag hozzáadása
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-70 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-3xl mx-auto my-6">
            {/* Modális tartalom */}
            <div className="relative flex  flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Fejléc */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-lg font-semibold">Tagok hozzáadása</h3>
                <button
                  className="p-1 ml-auto text-sm font-semibold text-gray-500 bg-transparent border-0 outline-none opacity-50 focus:outline-none"
                  onClick={closeModal}
                >
                  <span id="X" className="text-lg leading-none">
                    X
                  </span>
                </button>
              </div>
              {/* Tartalom */}
              <div className="relative p-6 flex-auto">
                {/* Tartalom elemek */}
                <div className="Container">
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" action="#" method="POST">
                        <div>
                          <label
                            htmlFor="text"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Név
                          </label>
                          <div className="mt-2">
                            <input
                              id="nev"
                              name="text"
                              type="text"
                              autoComplete="text"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            E-mail cím
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="text"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Telefonszám
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="tel"
                              name="text"
                              type="text"
                              autoComplete="current-text"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={Hozzaad}
                          >
                            Hozzáadás
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lábléc */}
            </div>
          </div>
        </div>
      )}

      <MemberList tableRows={tableRows} />
    </>
  );
}
