import { SearchProps } from "@/types/types";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

export const SearchFormComponent = ({searchInput,setSearchInput,handleSearch}:SearchProps) => {
  return (
    <div className="justify-end py-2 rounded-2xl flex items-center gap-2 ">
      <Input
        placeholder="Поиск по реестру..."
        prefix={<SearchOutlined className="text-violet-400 mr-2" />}
        className="h-8 border-0 bg-transparent text-white"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onPressEnter={handleSearch}
      />
      <Button
        type="default"
        onClick={handleSearch}
        className="h-14 font-black uppercase text-[11px] tracking-widest"
      >
        Найти
      </Button>
    </div>
  );
};
