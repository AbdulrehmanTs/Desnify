import CardIcon from '../../assets/Dashboard/CardIcon.svg';
import { EllipsisVertical } from 'lucide-react';

const DashboardCard = ({ title, amount }) => (
  <div className="bg-[#FAFAFA] py-6 px-4 shadow rounded-[16px] flex-1 space-y-2">
    <div className="flex w-full justify-between 2xl:pr-4">
      <p className="text-[#000000] font-['Rubik'] font-semibold text-sm sm:text-base leading-[100%] tracking-[0%]">
        {title}
      </p>
      <EllipsisVertical />
    </div>
    <div className="flex items-center gap-4">
      <img src={CardIcon} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
      <p className="text-[#000000] font-['Rubik'] font-semibold text-sm sm:text-base leading-[100%] tracking-[0%]">
        {amount}
      </p>
    </div>
  </div>
);

export default DashboardCard;
