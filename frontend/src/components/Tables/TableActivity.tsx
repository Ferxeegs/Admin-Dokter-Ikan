import { Activity } from "@/types/activity";

const activity: Activity[] = [
  {
    name: "Petambak 1",
    email: `petambak1@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
  {
    name: "Petambak 2",
    email: `petambak2@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
  {
    name: "Petambak 3",
    email: `petambak3@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
  {
    name: "Petambak 4",
    email: `petambak4@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
  {
    name: "Petambak 5",
    email: `petambak5@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
  {
    name: "Petambak 6",
    email: `petambak6@gmail.com`,
    topic: "Ikan berenang melingkar",
    tenagaAhli: "Drh. Diva Putri",
    status:"Belum",
  },
];

const TableActivity = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nama
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Topik Konsultasi
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tenaga Ahli 
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status 
              </th>
            </tr>
          </thead>
          <tbody>
            {activity.map((activityItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {activityItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {activityItem.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {activityItem.topic}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {activityItem.tenagaAhli}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      activityItem.status === "user"
                        ? "bg-success text-success"
                        : activityItem.status === "admin"
                          ? "bg-warning text-warning"
                          : "bg-danger text-danger"
                    }`}
                  >
                    {activityItem.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableActivity;
