"use client";
const ExpiredNotice = () => {
  return (
    <div className="m-[8px] border border-r-[4px] border-[#ebebeb] p-[32px] text-center">
      <span className="text-[40px] font-bold text-[#FF0000]">Expired!!!</span>
      <p className="text-[24px]">Please select a future date and time.</p>
    </div>
  );
};

export default ExpiredNotice;
