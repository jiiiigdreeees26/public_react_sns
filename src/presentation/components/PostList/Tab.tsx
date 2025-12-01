interface TabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  titles: string[];
}

export const Tab = ({ activeTab, setActiveTab, titles }: TabProps ) => {
  const activeTabClass =
  ' text-blue-500 border-b-2 font-medium border-blue-500';

  return (
    <div className="dark">
      <nav className="flex flex-col sm:flex-row">
        {
          titles?.map((title, i) => 
            <button
              key={i}
              className={
                'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none' +
                (activeTab === i + 1 ? activeTabClass : '')
              }
              onClick={() => setActiveTab(i + 1)}
            >
              {title}
            </button>
          )
        }
      </nav>
    </div>
  );
};
