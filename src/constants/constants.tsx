import { User } from "@/types/types";
import { CalendarOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Avatar, Tag, Typography} from "antd";
import { ColumnsType } from "antd/es/table";
const { Text } = Typography;

 export const columns: ColumnsType<User> = [
    {
      title: 'СОТРУДНИК',
      key: 'user',
      fixed: 'left',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.image} size={40} className="border border-violet-500/30 bg-slate-900" />
          <div className="flex flex-col min-w-0">
            <Text className="text-slate-100 font-bold text-[13px] truncate m-0">
              {record.firstName} {record.lastName}
            </Text>
            <Text className="text-violet-400 text-[10px] uppercase font-black">@{record.username}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'EMAIL АДРЕС',
      dataIndex: 'email',
      key: 'email',
      width: 220,
      render: (email: string) => (
        <a href={`mailto:${email}`} className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
            <MailOutlined className="text-slate-400 group-hover:text-white text-[12px]" />
          </div>
          <Text className="text-slate-400 text-[12px] group-hover:text-violet-400 transition-colors">{email}</Text>
        </a>
      ),
    },
    {
      title: 'ТЕЛЕФОН',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
      render: (phone: string) => (
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
            <PhoneOutlined className="text-slate-400 group-hover:text-white text-[12px]" />
          </div>
          <Text className="text-slate-400 font-mono text-[12px] group-hover:text-emerald-400 transition-colors">
            {phone}
          </Text>
        </a>
      ),
    },
    {
      title: 'IP АДРЕС',
      dataIndex: 'ip',
      key: 'ip',
      width: 140,
      render: (ip: string) => (
        <Tag className="bg-slate-900 border-slate-700 text-slate-500 font-mono text-[11px]">{ip}</Tag>
      ),
    },
    {
      title: 'ЛОКАЦИЯ',
      key: 'location',
      width: 180,
      render: (_, record) => (
        <div className="flex items-center gap-2 text-slate-400 text-[12px]">
          <EnvironmentOutlined className="text-rose-500" />
          <span className="truncate">
            {record.address.city}, {record.address.country}
          </span>
        </div>
      ),
    },
    {
      title: 'ДАТА РОЖД.',
      dataIndex: 'birthDate',
      key: 'birth',
      width: 130,
      render: (date: string) => (
        <div className="text-slate-400 text-[12px] flex items-center gap-2">
          <CalendarOutlined className="text-sky-400" /> {date}
        </div>
      ),
    },
    {
      title: 'БАНК',
      key: 'bank',
      width: 180,
      render: (_, record) => (
        <div className="flex flex-col text-[11px]">
          <span className="text-slate-300 font-bold uppercase">{record?.bank?.cardType}</span>
          <span className="text-slate-500 font-mono">**** {record?.bank?.cardNumber?.slice(-4)}</span>
        </div>
      ),
    },

    {
      title: 'ID КАРТА',
      dataIndex: 'ssn',
      key: 'ssn',
      width: 140,
      render: (ssn: string) => <span className="text-slate-500 font-mono text-[11px]">{ssn}</span>,
    },
  ];
