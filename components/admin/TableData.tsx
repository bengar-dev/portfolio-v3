import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

import { AppContext } from "../../context/AppContext";

import { ButtonForm } from "../form/ButtonForm";
import { TbEdit, TbTrash } from "react-icons/tb";

interface TableDataProps {
  headers: string[];
  data: any[];
  target: string;
  editEnable?: boolean;
  deleteEnable?: boolean;
}

export const TableData = (props: TableDataProps) => {
  const { toggleModal, handleToggle } = useContext(AppContext);
  const [tempData, setTempData] = useState<any[]>([]);

  const {
    headers = [],
    target,
    data,
    editEnable = false,
    deleteEnable = false,
  } = props;

  useEffect(() => {
    if (tempData.length === 0 && data.length > 0) setTempData(data);
  }, [data]);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/${
          target === "history" ? "about/historic" : target
        }/${id}`
      );
      handleToggle({
        title: "Success",
        message: "Historic has been deleted",
        toggle: true,
        style: "success",
      });
      const newArray = [...tempData];
      const findItems = newArray.findIndex((el) => el.id === id);
      newArray.splice(findItems, 1);
      setTempData(newArray);
    } catch (err: any) {
      handleToggle({
        title: "Error",
        message: err.message,
        toggle: true,
        style: "danger",
      });
    }
  };

  const handleDisplaySkills = async (id: string, status: boolean) => {
    const token = localStorage.getItem("token") || "";
    await axios.put(
      `${process.env.NEXT_PUBLIC_API}/skills/${id}`,
      {
        display: !status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const newArray = [...tempData];
    const findItems = newArray.findIndex((el) => el.id === id);
    newArray[findItems].display = !status;
    setTempData(newArray);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((head, index) => (
            <th
              key={index}
              className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
            >
              <div className="flex items-center gap-2">
                {`${head.charAt(0).toUpperCase()}${head.slice(1)}`}
              </div>
            </th>
          ))}
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {filterDataWithDynamicColumns(tempData, headers).map((data, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {headers.map((el, index) => (
              <td
                key={index}
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              >
                {el === "id" ? (
                  <span className="p-1 text-xs bg-violet-200 rounded-full">
                    {data[el].slice(0, 7)}
                  </span>
                ) : el === "date" ? (
                  format(new Date(data[el]), "dd/MM/yyyy")
                ) : el === "description" ? (
                  `${
                    data[el].length > 100
                      ? data[el].slice(0, 100) + "..."
                      : data[el]
                  }`
                ) : el === "display" ? (
                  data[el] ? (
                    <div
                      onClick={() => handleDisplaySkills(data.id, data[el])}
                      className="w-4 h-4 rounded-full bg-emerald-400 hover:bg-emerald-500 cursor-pointer"
                    />
                  ) : (
                    <div
                      onClick={() => handleDisplaySkills(data.id, data[el])}
                      className="w-4 h-4 rounded-full bg-rose-400 hover:bg-rose-500 cursor-pointer"
                    />
                  )
                ) : (
                  data[el]
                )}
              </td>
            ))}
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex space-x-1">
              {editEnable && (
                <ButtonForm
                  func={() => {
                    router.push({
                      pathname: `/admin/${target}`,
                      query: { id: data.id },
                    });
                    toggleModal(true);
                  }}
                  value={<TbEdit />}
                  type="button"
                  style="edit"
                />
              )}
              {deleteEnable && (
                <ButtonForm
                  func={() => handleDelete(data.id)}
                  value={<TbTrash />}
                  type="button"
                  style="delete"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function filterDataWithDynamicColumns<T>(data: T[], column: Array<keyof T>) {
  const newArray: any[] = [];

  data.forEach((el) => {
    let newObject: any = {};
    column.forEach((param) => {
      if (el[param] !== undefined) {
        newObject[param] = el[param];
      }
    });
    newArray.push(newObject);
  });
  return newArray;
}
