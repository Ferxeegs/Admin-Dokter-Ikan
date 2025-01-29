import Image from "next/image";

const incomeData = [
  {
    logo: "/images/icon/petambak.svg",
    name: "Petambak 1",
    date: "18 Desember 2024",
    amount: "+$32",
  },
  {
    logo: "/images/icon/petambak2.svg",
    name: "Petambak 2",
    date: "18 Desember 2024",
    amount: "+$45",
  },
  {
    logo: "/images/icon/petambak3.svg",
    name: "Petambak 3",
    date: "18 Desember 2024",
    amount: "+$65",
  },
];

const outcomeData = [
  {
    logo: "/images/icon/petambak.svg",
    name: "Petambak 1",
    date: "18 Desember 2024",
    amount: "-$30",
  },
  {
    logo: "/images/icon/petambak2.svg",
    name: "Petambak 2",
    date: "18 Desember 2024",
    amount: "-$43",
  },
  {
    logo: "/images/icon/petambak3.svg",
    name: "Petambak 3",
    date: "18 Desember 2024",
    amount: "-$63",
  },
];

const TableRevenue = () => {
  return (
    <div className="flex gap-6">
      {/* Income Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">Income</h4>
        <div className="flex flex-col">
          {incomeData.map((item, key) => (
            <div
              className={`grid grid-cols-3 items-center gap-3 p-3 ${key !== incomeData.length - 1 ? "border-b border-stroke dark:border-strokedark" : ""}`}
              key={key}
            >
              <div className="flex items-center gap-4">
                <Image src={item.logo} alt="Brand" width={40} height={40} />
                <p className="text-black dark:text-white font-normal text-sm">{item.name}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
              <p className="text-green-500 font-semibold">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">Outcome</h4>
        <div className="flex flex-col">
          {outcomeData.map((item, key) => (
            <div
              className={`grid grid-cols-3 items-center gap-3 p-3 ${key !== outcomeData.length - 1 ? "border-b border-stroke dark:border-strokedark" : ""}`}
              key={key}
            >
              <div className="flex items-center gap-3">
                <Image src={item.logo} alt="Brand" width={40} height={40} />
                <p className="text-black dark:text-white font-normal text-sm">{item.name}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
              <p className="text-red-500 font-semibold">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableRevenue;
