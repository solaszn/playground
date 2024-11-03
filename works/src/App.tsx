
import { LuChevronRight, LuCloudSun } from 'react-icons/lu';
import './App.css';
import 'react-icons/lu'

function App({children}:{
  params?: any,
  children: React.ReactNode
}) {
  return (
    <div className="App">

      <div className="grid grid-rows-[32px_1fr_32px] gap-10 bg-neutral-100 max-w-[1600px] mx-auto px-[60px] py-10 h-screen font-inter">
        
        {/* Heading */}
        <div className="flex justify-between h-8 text-sm">
          <div className="flex gap-1.5 px-3 py-1 border border-neutral-200 rounded-md bg-white items-center">
            <div className="text-neutral-400 flex gap-1.5 items-center">Works <LuChevronRight size={18}/> </div>
            <span className="font-medium">Features</span>
          </div>

          <div className="flex gap-5">
          <div className="flex gap-1.5 px-3 py-1 border border-neutral-200 rounded-md bg-white items-center">9:14 AM</div>
          <div className="flex gap-1.5 px-3 py-1 border border-neutral-200 rounded-md bg-white items-center"><LuCloudSun size={18}/> Lagos</div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex h-full border border-neutral-200 bg-white rounded-lg"></div>

        {/* Footer */}
        <div className="h-8 text-sm flex justify-between text-neutral-500">
          <div>An exploration by Feyisola Olawuyi</div>
          <div>Last updated 2 days ago</div>
        </div>

      </div>

    </div>
  );
}

export default App;
