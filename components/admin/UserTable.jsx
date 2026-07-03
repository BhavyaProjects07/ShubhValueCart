"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";


export default function UsersTable() {
  const { getToken } = useAuth();
    const currency =
  process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";
  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortBy, setSortBy] = useState("name");

  const [sortOrder, setSortOrder] = useState("asc");

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data.users || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    const keyword = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.phone?.toLowerCase().includes(keyword) ||
        user.storeName?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  // =========================
  // SORTING
  // =========================
  const sortedUsers = useMemo(() => {
    const copied = [...filteredUsers];

    copied.sort((a, b) => {
      let first = a[sortBy];
      let second = b[sortBy];

      if (typeof first === "string") first = first.toLowerCase();
      if (typeof second === "string") second = second.toLowerCase();

      if (first > second)
        return sortOrder === "asc" ? 1 : -1;

      if (first < second)
        return sortOrder === "asc" ? -1 : 1;

      return 0;
    });

    return copied;
  }, [filteredUsers, sortBy, sortOrder]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    sortedUsers.length / rowsPerPage
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;

    return sortedUsers.slice(
      start,
      start + rowsPerPage
    );
  }, [sortedUsers, currentPage, rowsPerPage]);

  // =========================
  // SORT HANDLER
  // =========================
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // =========================
  // EXPORT EXCEL
  // =========================
  const exportToExcel = () => {
    try {
      const excelData = users.map((user) => ({
        Name: user.name,
        Email: user.email,
        Phone: user.phone,
        Orders: user.orders,
        CompletedOrders: user.completedOrders,
        TotalSpent: user.totalSpent,
        Addresses: user.addresses,
        Ratings: user.ratings,
        CouponsUsed: user.couponsUsed,
        Seller: user.isSeller ? "Yes" : "No",
        SellerStatus: user.sellerStatus || "-",
        Store: user.storeName || "-",
      }));

      const worksheet =
        XLSX.utils.json_to_sheet(excelData);

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Users"
      );

      XLSX.writeFile(
        workbook,
        `users-${Date.now()}.xlsx`
      );

      toast.success("Excel exported.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to export Excel.");
    }
  };

  // =========================
  // RETURN
  // =========================
  return (
  <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

    {/* ================= HEADER ================= */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-6 border-b">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Registered Users
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Total Users :{" "}
          <span className="font-semibold text-green-600">
            {users.length}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}

        <input
          type="text"
          placeholder="Search name, email, phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-72 rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />

        {/* Rows */}

        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="rounded-xl border border-gray-300 px-3 py-2.5 outline-none"
        >
          <option value={10}>10 Rows</option>
          <option value={25}>25 Rows</option>
          <option value={50}>50 Rows</option>
          <option value={100}>100 Rows</option>
        </select>

        {/* Export */}

        <button
          onClick={exportToExcel}
          className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
        >
          Export Excel
        </button>

      </div>

    </div>

    {/* ================= TABLE ================= */}

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="sticky top-0 bg-gray-50 border-b">

          <tr className="text-sm text-gray-700">

            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer whitespace-nowrap px-6 py-4 text-left font-semibold"
            >
              User
            </th>

            <th
              onClick={() => handleSort("phone")}
              className="cursor-pointer whitespace-nowrap px-6 py-4 text-left font-semibold"
            >
              Phone
            </th>

            <th
              onClick={() => handleSort("orders")}
              className="cursor-pointer whitespace-nowrap px-6 py-4 text-center font-semibold"
            >
              Orders
            </th>

            <th
              onClick={() => handleSort("completedOrders")}
              className="cursor-pointer whitespace-nowrap px-6 py-4 text-center font-semibold"
            >
              Completed
            </th>

            <th
              onClick={() => handleSort("totalSpent")}
              className="cursor-pointer whitespace-nowrap px-6 py-4 text-center font-semibold"
            >
              Total Spent
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold">
              Address
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold">
              Seller
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold">
              Ratings
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold">
              Coupons
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold">
              Last Order
            </th>

          </tr>

        </thead>

        <tbody>

                      {/* PART 2 */}
                      {loading ? (
  <tr>
    <td
      colSpan={10}
      className="py-16 text-center text-gray-500"
    >
      Loading users...
    </td>
  </tr>
) : paginatedUsers.length === 0 ? (
  <tr>
    <td
      colSpan={10}
      className="py-16 text-center text-gray-500"
    >
      No users found.
    </td>
  </tr>
) : (
  paginatedUsers.map((user) => (
    <tr
      key={user.id}
      className="border-b hover:bg-green-50/40 transition"
    >
      {/* USER */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">

          <img
            src={
              user.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=16a34a&color=fff`
            }
            alt={user.name}
            className="h-12 w-12 rounded-full border object-cover"
          />

          <div>

            <p className="font-semibold text-gray-800">
              {user.name}
            </p>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

          </div>

        </div>
      </td>

      {/* PHONE */}

      <td className="px-6 py-5 whitespace-nowrap text-gray-700">
        {user.phone}
      </td>

      {/* ORDERS */}

      <td className="px-6 py-5 text-center">
        <span className="rounded-lg bg-blue-100 px-3 py-1 font-semibold text-blue-700">
          {user.orders}
        </span>
      </td>

      {/* COMPLETED */}

      <td className="px-6 py-5 text-center">
        <span className="rounded-lg bg-green-100 px-3 py-1 font-semibold text-green-700">
          {user.completedOrders}
        </span>
      </td>

      {/* SPENT */}

      <td className="px-6 py-5 text-center font-semibold text-green-700">
        {currency}
        {user.totalSpent.toLocaleString()}
      </td>

      {/* ADDRESS */}

      <td className="px-6 py-5">

        {user.defaultAddress ? (
          <div className="max-w-[230px]">

            <p className="font-medium">
              {user.defaultAddress.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.defaultAddress.street},{" "}
              {user.defaultAddress.city}
            </p>

          </div>
        ) : (
          <span className="text-gray-400">
            No Address
          </span>
        )}

      </td>

      {/* SELLER */}

      <td className="px-6 py-5 text-center">

        {user.isSeller ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              user.sellerStatus === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {user.sellerStatus}
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            Customer
          </span>
        )}

      </td>

      {/* RATINGS */}

      <td className="px-6 py-5 text-center">
        {user.ratings}
      </td>

      {/* COUPONS */}

      <td className="px-6 py-5 text-center">
        {user.couponsUsed}
      </td>

      {/* LAST ORDER */}

      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">

        {user.lastOrder
          ? new Date(user.lastOrder).toLocaleDateString()
          : "-"}

      </td>
    </tr>
  ))
)}

        </tbody>

      </table>

    </div>

          {/* PART 3 */}
          {/* ================= PAGINATION ================= */}

<div className="flex flex-col gap-4 border-t bg-gray-50 px-6 py-4 md:flex-row md:items-center md:justify-between">

  <div className="text-sm text-gray-600">
    Showing{" "}
    <span className="font-semibold">
      {sortedUsers.length === 0
        ? 0
        : (currentPage - 1) * rowsPerPage + 1}
    </span>{" "}
    to{" "}
    <span className="font-semibold">
      {Math.min(
        currentPage * rowsPerPage,
        sortedUsers.length
      )}
    </span>{" "}
    of{" "}
    <span className="font-semibold">
      {sortedUsers.length}
    </span>{" "}
    users
  </div>

  <div className="flex items-center gap-2">

    {/* Previous */}

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      className="rounded-lg border bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    {/* Page Numbers */}

    {Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1
    )
      .slice(
        Math.max(0, currentPage - 3),
        Math.min(totalPages, currentPage + 2)
      )
      .map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
            currentPage === page
              ? "bg-green-600 text-white shadow"
              : "border bg-white hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

    {/* Next */}

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      className="rounded-lg border bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>

  </div>

</div>

  </div>
);
}