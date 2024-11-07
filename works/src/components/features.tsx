import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { worksConfig } from "../config/site";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



const Features = () => {
  const tabs = worksConfig.carousel.tabs;
  const [activeTab, setActiveTab] = useState(0);
  const [lastTab, setLastTab] = useState(0); 

  const handleTabChange = (index: any) => {
    setLastTab(activeTab);
    setActiveTab(index);
  };

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "left" ? '100%' : '-100%',
      opacity: 1,
      zIndex: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 2,
    },
    exit: (direction: string) => ({
      x: direction === "left" ? '-100%' : '100%',
      opacity: 1,
      zIndex: 1,
    }),
  };

  const getDirection = () => (activeTab > lastTab ? "left" : "right");

  return (
    <TabGroup selectedIndex={activeTab} onChange={handleTabChange} className="w-full h-fit py-6">
      <TabList className="flex gap-4 px-2 py-1.5 rounded-full bg-gray-100 overflow-auto w-[calc(100vw - 48px)] sm:w-fit mx-auto transition-any smooth hide-scrollbar">
        {tabs.map((tab: any) => (
          <Tab key={tab.label} className={({ selected }) => `${selected ? 'text-white bg-black font-semibold' : 'text-gray-500 bg-black/[.03] hover:bg-gray-200 cursor-pointer font-medium'} flex px-4 h-7 items-center text-sm rounded-full focus-visible:outline-none transition-any`}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels className="w-full mt-10 ">
        <div className="aspect-[4/5] sm:aspect-video bg-gray-100 w-full md:w-10/12 max-w-screen-lg mx-auto min-h-[300px] max-h-[520px] rounded-2xl transition-any smooth overflow-clip relative">
          <div className="relative zu0vm9576q w-full h-full flex items-end z-20 p-4 lg:p-10">
            <div className="flex flex-col gap-2 w-full sm:w-10/12 lg:w-8/12">
              <div className="text-xl md:text-2xl font-semibold text-white">{tabs[activeTab].title}</div>
              <div className="text-sm md:text-base text-gray-200">{tabs[activeTab].message}</div>
            </div>
          </div>
          <AnimatePresence initial={false} custom={getDirection()}>
            {/* Previous Image (Fading Out) */}
            <motion.img
              key={"1"}
              src={tabs[lastTab].image}
              custom={getDirection()}
              initial="center"
              animate="exit"
              exit="exit"
              variants={slideVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Current Image (Sliding In) */}
            <motion.img
              key={tabs[activeTab].label}
              src={tabs[activeTab].image}
              custom={getDirection()}
              initial="enter"
              animate="center"
              exit="exit"
              variants={slideVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </TabPanels>
    </TabGroup>
  )
}

export default Features;