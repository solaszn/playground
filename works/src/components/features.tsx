import { Tab, TabGroup, TabList } from "@headlessui/react";
import { worksConfig } from "../config/site";



const Features = () => {
  const tabs = worksConfig.carousel.tabs;
  console.log(tabs)
  return (
    <div className="mt-8">
      <TabGroup>
        <TabList className="flex gap-4 px-2 py-1.5 rounded-full bg-gray-100">
          {tabs.map((tab:any) => (
            <Tab key={tab.label} className={({selected}) => `${selected ? 'text-white bg-black font-semibold' : 'text-gray-500 hover:bg-gray-200 cursor-pointer font-medium'} flex px-4 h-7 items-center text-sm rounded-full focus-visible:outline-none transition-any`}>{tab.label}</Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  )
}

export default Features;