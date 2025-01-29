"use client";
import React from "react";
import ChartTwo from "../Charts/ChartTwo";
import TableRevenue from "../Tables/TableRevenue";
import CardDataStats from "../CardDataStats";
import Image from "next/image";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="13.456" rate="0.43%" levelUp>
          <Image
              width={22}
              height={12}
              src={"/images/icon/total-views.svg"}
              alt="Total Views"
          />  
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$19.890" rate="4.35%" levelUp>
            <Image
              width={22}
              height={12}
              src={"/images/icon/total-profit.svg"}
              alt="Total Profit"
            />
        </CardDataStats>
        <CardDataStats title="Total Expert" total="155" rate="2.59%" levelUp>
        <Image
              width={22}
              height={12}
              src={"/images/icon/total-expert.svg"}
              alt="Total Expert"
            />
        </CardDataStats>
        <CardDataStats title="Total Users" total="1236" rate="0.95%" levelDown>
          <Image
              width={22}
              height={12}
              src={"/images/icon/total-users.svg"}
              alt="Total Users"
            />
        </CardDataStats>
      </div>
      <p className="text-lg font-bold text-black mt-5">Transaksi terbaru</p>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <div className="col-span-12 xl:col-span-12">
          <TableRevenue />
        </div>
      
        <ChartTwo />
      </div>
    </>
  );
};

export default Dashboard;
